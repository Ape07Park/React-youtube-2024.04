import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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
          <Grid item xs={5}>
            {/* navigate에서 데이터 전달 방법: 1) replace: false면 뒤로 가기 안됨. 2) state: 정보전달 o state에 obj형식으로 필요한 정보 주기 */}
            <Item onClick={() => navigate(`/videos/watch/${videoId}`, {state:{video}})}   >
              <img src={thumbnails.medium.url} alt={title} />
              <div>
                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="body2">{channelTitle}</Typography>
                <Typography variant="body2">{formatAgo(publishedAt, 'ko')}</Typography>
              </div>
            </Item>   
          </Grid>      
      
  );
}
