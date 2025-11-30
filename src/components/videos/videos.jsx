// src/components/videos/Videos.jsx
import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Avatar,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

function Videos({ videos = [], onVideoClick }) {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {videos?.map((video) => {
        // video.id can be either string or object { videoId: '...' }
        const videoId = video?.id?.videoId || video?.id;
        const thumb = video?.snippet?.thumbnails?.high?.url;
        const title = video?.snippet?.title || "No title";
        const description = video?.snippet?.description || "";
        const channel = video?.snippet?.channelTitle || "";

        return (
          <Grid
            item
            key={videoId || Math.random()}
            sx={{width:{xs: '100%', sm: '360px', md: '320px', }}}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                justifyContent: "space-between",
                boxShadow: "none",
                bgcolor: "background.paper",
                transition: "transform .15s ease, box-shadow .15s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: theme.shadows[3],
                },
              }}
            >
              <CardActionArea
                sx={{ alignItems: "stretch", display: "flex", flexDirection: "column", height: "100%" }}
                onClick={() => onVideoClick?.(video)}
              >
                {/* Responsive thumbnail: keep 16:9 aspect ratio */}
                <Box sx={{ width: "100%", position: "relative", pt: "56.25%" }}>
                  <CardMedia
                    component="img"
                    image={thumb}
                    alt={title}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, width: "100%" }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minHeight: "3rem",
                    }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      mb: 1,
                    }}
                  >
                    {description}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                    <Avatar
                      src={thumb}
                      alt={channel}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", fontWeight: 600 }}
                      >
                        {channel}
                      </Typography>
                      <CheckCircle sx={{ fontSize: 14, color: "text.secondary", ml: 0.5 }} />
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Videos;
