import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel')
    return null;
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Item onClick={() => navigate(`/videos/watch/${videoId}`)}>
              <img src={thumbnails.medium.url} alt={title} />
              <div>
                <p>{title}</p>
                <p>{channelTitle}</p>
                <p>{formatAgo(publishedAt, 'ko')}</p>
              </div>
            </Item>   
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
