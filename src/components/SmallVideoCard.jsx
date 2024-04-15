import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { formatAgo } from "../util/date";
import { useNavigate } from "react-router-dom";


export default function SmallVideoCard({video}) {
  const navigate = useNavigate();
  const videoId = video.id.videoId
  const {title, thumbnails, publishedAt, channelTitle} = video.snippet;
  
  return(
    
    <Card onClick={() => navigate(`/videos/watch/${videoId}`, {state:{video}})} style={{width:"100%"}} >
      <CardContent style={{width:"90%"}}>
        <Stack direction={"row"} spacing={4}>
        <img src={thumbnails.default.url} alt={title} />
        <div>
        <Typography variant="subtitle2" >{title}</Typography>
        <Typography variant="body2">{channelTitle}</Typography>
       
        <Typography variant="body2">{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
        </Stack>
      </CardContent>
    </Card>
  );
}