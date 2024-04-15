import React from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useChannelInfo } from "../api/youtube";

export default function ChannelInfo({ id, name }) {
  // const {data: url} = useQuery({
  //   queryKey: ['channel', id], 
  //   queryFn: async () => {
  //     return axios
  //             .get('/data/channels.json')
  //             // .get(url) // 실제 사용
  //             .then(res => res.data.items[0].snippet.thumbnails.default.url)
  //   },
  //   staleTime: 1000 * 60 * 5, // 5분
  // })
  const { url } = useChannelInfo(id);
  
  // subscribeNum 넣기 
  return (
    <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={2} >
      
      {url && <img src={url} alt={name} height={64} width={64} />}
      <h4>{name}</h4>
      <br/>
      <Typography>구독자{}</Typography>
    </Stack>

  );
}
