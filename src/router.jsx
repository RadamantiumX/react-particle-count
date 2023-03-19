import { createBrowserRouter } from "react-router-dom";
import ImagePage from "./pages/ImagePage";
import DataPage from "./pages/DataPage";
import HomePage from "./pages/HomePage";


const router = createBrowserRouter([

    {
       path: '/',
       element: <HomePage/>
    },

    {
        path: '/media',
        element: <ImagePage/>  
    },
    {
        path:'/data',
        element: <DataPage/>
    }
])

export default router;