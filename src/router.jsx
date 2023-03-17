import { createBrowserRouter } from "react-router-dom";
import ImagePage from "./pages/ImagePage";
import DataPage from "./pages/DataPage";


const router = createBrowserRouter([

    {
        path: '/',
        element: <ImagePage/>  
    },
    {
        path:'/data',
        element: <DataPage/>
    }
])

export default router;