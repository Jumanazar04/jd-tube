import { CheckCircle } from "@mui/icons-material";
import { Card, CardMedia, CardContent, Typography, Stack, Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function VideoCard({ video }) {
  const videoId = video?.id?.videoId || video?.id;
  const snippet = video?.snippet;

  return (
    <Link
      to={`/video/${videoId}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          height: "100%",
          borderRadius: 3,
          boxShadow: 4,
          cursor: "pointer",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: ".3s",
          "&:hover": { transform: "scale(1.03)", boxShadow: 7 },
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack spacing={1}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {snippet?.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" fontWeight="600">
              {snippet?.channelTitle}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {formatDate(snippet?.publishedAt)}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                opacity: 0.9,
              }}
            >
              {snippet?.description}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                    <Avatar
                      src={snippet?.thumbnails?.default?.url}
                      alt={snippet?.channelTitle}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", fontWeight: 600 }}
                      >
                        {snippet?.channelTitle}
                      </Typography>
                      <CheckCircle sx={{ fontSize: 14, color: "text.secondary", ml: 0.5 }} />
                    </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}
