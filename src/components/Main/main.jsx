import { Box, Container, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { colors } from "../../constants/colors";
import Category from "../category/category";
import Videos from "../videos/videos";
import { fetchFromAPI } from "../../service/api.service";

function Main() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const items = await fetchFromAPI("search", {
          q: selectedCategory,
          type: "video",
        });
        setVideos(items);
      } catch (e) {
        console.error(e);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCategory]);



  return (
    <Stack>
      <Category
        selectedCategory={selectedCategory}
        selectedCategoryHandler={setSelectedCategory}
      />

      <Box p={2} sx={{ height: "90vh" }}>
        <Container maxWidth={"90%"}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {selectedCategory}{" "}
            <span style={{ color: colors.secondary }}>videos</span>
          </Typography>
        </Container>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
}

export default Main;
