// 내가 만든 커스텀 훅: model 역할
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export const useVideo = keyword => {

  const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`;
  const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet`;
  
  const {isLoading, error, data: videos} = useQuery({
    queryKey: ['videos', keyword], // keyword, videos에 변화 생기면 데이터 새롭게 가져옴 
    queryFn: async () => {
      const uri = keyword ? keywordUri + keyword : popularUri; // 실제 사용 
      return axios
              // .get(`/data/${keyword ? 'search' : 'popular'}.json`) //  mock data
              .get(uri) // 실제 사용 
              .then(res => res.data.items);
    },
    staleTime: 1000 * 60 * 1,   // 1분, ms 단위 
  });
  return {isLoading, error, videos};
}

export const useChannelInfo = id =>{
  const uri = `https://youtube.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet`;
  const {data: url} = useQuery({

    queryKey: ['channel', id], 
    queryFn: async () => {
      return axios
              // .get('/data/channels.json')
              .get(url) // 실제 사용
              .then(res => res.data.items[0].snippet.thumbnails.default.url);
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
  return {url};
}

export const useRelatedVideo = channelId => {
  const uri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&channelId=${channelId}`;
  const {isLoading, error, data: videos} = useQuery({
    queryKey: ['relatedVideos', channelId], 
    queryFn: async () => {
      return axios
              // .get('/data/searchChannel.json')
              .get(uri) // 실제 사용
              .then(res => res.data.items);
    },
    staleTime: 1000 * 60 * 1, // 1분
  })
  return {isLoading, error, videos};
}

