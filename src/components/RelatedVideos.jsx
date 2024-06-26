import React from "react";

import Stack from '@mui/material/Stack';
import SmallVideoCard from "./SmallVideoCard";

import LoopIcon from '@mui/icons-material/Loop';
import WarningIcon from '@mui/icons-material/Warning';
import { useRelatedVideo } from "../api/youtube";

export default function RelatedVideos({id, name}) {
  // const uri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=surfing`;
  
  // const {isLoading, error, data: videos} = useQuery({
  //   queryKey: ['relatedVideos', id], 
  //   queryFn: async () => {
  //     return axios
  //             .get('/data/searchChannel.json')
  //             // .get(uri) // 실제 사용
  //             .then(res => res.data.items)
  //   },
  //   staleTime: 1000 * 60 * 1, // 1분
  // })
  
  const {isLoading, error, videos} = useRelatedVideo(id);

  return (   
    <>
    {isLoading && <p><LoopIcon/>Loading..</p>}
    {error && <p><WarningIcon/>Something is wrong</p>}
    
    {videos && (
    <Stack direction={"column"}>
      <h4 style={{textAlign:"center"}}>이 채널의 다른 영상들 </h4>
    
        {videos.map(video => (<SmallVideoCard video={video}/>))}
      
    </Stack> 
    )}   
    </>
  );
}
