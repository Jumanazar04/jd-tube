// import { useParams } from "react-router"

//  function Video1(){
//     const params = useParams()

//     console.log(params);
    
//     return (
//         <div>Video</div>
//     )
//  }

//  export default Video1

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Stack, Grid } from "@mui/material";
import { fetchFromAPI } from "../../service/api.service";
import VideoCard from "../../components/VideoCard";

export default function Video() {
  const { id } = useParams();

  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    async function loadVideo() {
      // Video haqidagi ma'lumot
      const detailData = await fetchFromAPI(
        `videos?part=snippet,statistics&id=${id}`
      );
      setVideoDetail(detailData?.[0]);

      // Related videolar
      const related = await fetchFromAPI(
        `search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=30`
      );
      setRelatedVideos(related);
    }

    loadVideo();
  }, [id]);

  if (!videoDetail) return <Typography p={2}>Loading...</Typography>;

  const { snippet, statistics } = videoDetail;

  return (
    <Grid container spacing={2} display={'flex'} direction={'row'} sx={{flexWrap:{sm: 'wrap', md:'nowrap'}}} padding={2}>
      {/* Left section: Video player */}
      <Grid item  sx={{width:{xs: '100%', sm: '360px', md: '320px', }}}>
        <Box
          sx={{
            width: "100%",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${id}`}
            title={snippet.title}
            allowFullScreen
            style={{ border: "none", borderRadius: 12 }}
          ></iframe>
        </Box>

        {/* Title */}
        <Typography variant="h5" mt={2} fontWeight="bold">
          {snippet.title}
        </Typography>

        {/* Channel */}
        <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
          {snippet.channelTitle}
        </Typography>

        {/* Views + Date */}
        <Typography variant="caption" color="text.secondary">
          {Number(statistics.viewCount).toLocaleString()} views •{" "}
          {new Date(snippet.publishedAt).toLocaleDateString("en-US")}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          mt={2}
          sx={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          {snippet.description}
        </Typography>
      </Grid>

      {/* Right section: related videos */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" mb={1} fontWeight="bold">
          Related videos
        </Typography>

        <Stack spacing={2}>
          {relatedVideos.map((video, i) => (
            <VideoCard key={i} video={video} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
