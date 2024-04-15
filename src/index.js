import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import NotFound from './pages/NotFound';
import reportWebVitals from './reportWebVitals';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ProtectedRoute from './pages/ProtectedRoute';
import ViewRecord from './pages/ViewRecord';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<NotFound/>,
    children:[
      {index: true, element: <Videos />},
      {path: 'Videos', element:<Videos />},
      {path: 'Videos/:keyword', element:<Videos />},
      {path: 'Videos/watch/:videoId', element:<VideoDetail />},
      { path: 'signUp', element: <SignUp /> },
      { path: 'signIn', element: <SignIn /> },

      // 로그인한 사용자만 볼 수 있게 함, 사용자 정보를 알아야만 조회수를 볼 수 있기에 
      {path: 'videos/record',
        element: <ProtectedRoute><ViewRecord /></ProtectedRoute> }, 
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
