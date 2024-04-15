
import { useParams } from "react-router-dom";

import LoopIcon from '@mui/icons-material/Loop';
import WarningIcon from '@mui/icons-material/Warning';
import VideoCard from "../components/VideoCard";
import Grid from '@mui/material/Grid';
import { useVideo } from "../api/youtube";


// const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=surfing`;
// const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet`;
export default function Videos() {
  const {keyword} = useParams();
  // const {isLoading, error, data: videos} = useQuery({
  //   queryKey: ['videos', keyword], // keyword, videos에 변화 생기면 데이터 새롭게 가져옴 
  //   queryFn: async () => {
  //     const uri = keyword ? keywordUri + keyword : popularUri // 실제 사용 
  //     return axios
  //             .get(`/data/${keyword ? 'search' : 'popular'}.json`) //  mock data
  //             // .get(uri) // 실제 사용 
  //             .then(res => res.data.items);
  //   },
  //   staleTime: 1000 * 60 * 1,   // 1분, ms 단위 
  // });

  const {isLoading, error, videos} = useVideo(keyword);

  // useEffect(() => {
  //   axios.get(`/data/${keyword ? 'search' : 'popular'}.json`)
  //     .then(res => { // json 파일을 풀어헤침    
  //     setVideos(res.data.items);
  //     console.log(videos);
  //   });
  // }, [keyword]);

  return (
    <>
    {/* <div >Videos {keyword ? `${keyword}로 검색`: 'Hot Trend'} </div> */}
    {isLoading && <p><LoopIcon/>Loading..</p>}
    {error && <p><WarningIcon/>Something is wrong</p>}
    {/*video 여기서 띄움, videos에 아무것도 로딩 못해서 map함수 사용 불가*/}
    {videos && (
    <ul>

    <Grid container columns={16} width="100%">
      {videos.map(video => <VideoCard video={video} />)}       
    </Grid>
    </ul>
    )}    
    </>
  )
}