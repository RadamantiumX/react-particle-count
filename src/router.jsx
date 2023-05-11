import { Navigate, createBrowserRouter } from "react-router-dom";
import ImagePage from "./pages/ImagePage";
import DataPage from "./pages/DataPage";
import HomePage from "./pages/HomePage";
import UserInfo from "./pages/UserInfo";
import GuestLayout from "./layout/GuestLayout";
import MapPage from "./pages/MapPage";

const router = createBrowserRouter([
   {
    path: '/',
    element: <GuestLayout/>,
    children:[
        {
            path: '/',
            element: <Navigate to="/home"/>
        },
        {
            path: '/home',
            element: <HomePage/>
        },
        {
            path:'/info',
            element: <UserInfo/>
        },
         {
       path:'/map',
       element: <MapPage/>
   }
       
    ]
   },
   
   {
    path: '/media',
    element: <ImagePage/>
   },
   {
    path: '/data',
    element: <DataPage/>
   },

  
])

export default router;