import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AuthContextProvider } from './context/AuthContext';
import SearchHeader from './components/SearchHeader';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthContextProvider>  {/* 이 태그 안에서는 훅 사용 가능  */ }

      <QueryClientProvider client={queryClient}> 
        <SearchHeader />
        { /*useQuery라는 훅을 쓰기 위해 이거 만듦 */}
        <Outlet />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;