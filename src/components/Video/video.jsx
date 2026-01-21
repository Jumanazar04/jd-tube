import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { fetchFromAPI } from "../../service/api.service";
import VideoCard from "../../components/VideoCard";

export default function Video() {
  const { id } = useParams();

  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    async function loadVideo() {
      try {
        // 1) Video detail
        const videoDetailData = await fetchFromAPI("videos", {
          id,
          part: "snippet,statistics",
        });

        const detail = (videoDetailData?.items?.[0] ?? videoDetailData?.[0] ?? null);
        setVideoDetail(detail);

        // 2) Related videos
        try {
            const relatedItems = await fetchFromAPI("search", {
                part: "snippet",
                // relatedToVideoId o'rniga qidiruvdan foydalanish tavsiya etiladi
                q: "react tutorials", // Masalan, videoning mavzusini shu yerga qo'ying
                type: "video",
                maxResults: 20,
            });

            // 1. relatedItems massiv ekanligini tekshiramiz
            if (Array.isArray(relatedItems)) {
                const filtered = relatedItems.filter((v) => 
                    v?.id?.videoId && v.id.videoId !== id
                );
                setRelatedVideos(filtered);
            } else {
                console.error("API massiv qaytarmadi:", relatedItems);
            }
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }

      } catch (error) {
        console.error("Failed to load video:", error);
        setRelatedVideos([]);
      } finally {
        setLoading(false);
      }
    }

    loadVideo();
  }, [id]);

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!videoDetail) {
    return <Typography p={2}>Video not found</Typography>;
  }

  console.log(relatedVideos);
  

  const { snippet, statistics } = videoDetail;

  return (
    <Grid
      container
      spacing={2}
      padding={2}
      sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
    >
      {/* LEFT: Main video (≈70%) */}
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={snippet?.title}
            allowFullScreen
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </Box>

        <Typography variant="h5" mt={2} fontWeight="bold">
          {snippet?.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
          {snippet?.channelTitle}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {statistics?.viewCount &&
            `${Number(statistics.viewCount).toLocaleString()} views • `}
          {snippet?.publishedAt
            ? new Date(snippet.publishedAt).toLocaleDateString()
            : ""}
        </Typography>

        <Typography
          variant="body2"
          mt={2}
          sx={{ whiteSpace: "pre-line", lineHeight: 1.6, opacity: 0.9 }}
        >
          {snippet?.description}
        </Typography>
      </Grid>

      {/* RIGHT: Related (≈30%) */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" mb={1} fontWeight="bold">
          Related videos
        </Typography>

        {relatedVideos.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Related video topilmadi.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {relatedVideos.map((video) => (
              <VideoCard key={video.id.videoId} video={video} />
            ))}
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}
