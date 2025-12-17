import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { fetchFromAPI } from "../../service/api.service";
import VideoCard from "../VideoCard";

function Search() {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getVideos() {
      const data = await fetchFromAPI(
        `search?part=snippet&q=${id}&maxResults=50`
      );
      setVideos(data || []);
      console.log(data);
    }
    getVideos();
  }, [id]);
  console.log(videos, id);
  
  return (
    <Grid container spacing={2} padding={2}>
      {videos.length > 0 ? (
        videos.map((video, i) => (
          <Grid
            item
            sx={{width:{xs: '100%', sm: '360px', md: '320px', }}}
            key={i}
          >
            <VideoCard video={video} />
          </Grid>
        ))
      ) : (
        <Typography variant="h6" sx={{ p: 2 }}>
          Loading...
        </Typography>
      )}
    </Grid>
  );
}

export default Search;
