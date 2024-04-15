import {Outlet} from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import {QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  console.log(process.env.REACT_APP_YOUTUBE_API_KEY)
  return (
   <AuthContextProvider> {/* 이 태그 안에서는 훅 사용 가능  */ }
   <SearchHeader />
    <QueryClientProvider client={queryClient}> { /*useQuery라는 훅을 쓰기 위해 이거 만듦 */}
      <Outlet />
    </QueryClientProvider>
   
   </AuthContextProvider>
  );
}

export default App;
