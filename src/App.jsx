import {Outlet} from 'react-router-dom';

function App() {
  console.log(process.env.REACT_APP_YOUTUBE_API_KEY)
  return (
   <>
    <Outlet />
   </>
  );
}

export default App;
