import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from './contexts/ContextProvider';
import router from './router';
import { RouterProvider } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider>
       <RouterProvider router={router}/>
    </ChakraProvider>
    </ContextProvider>
  </React.StrictMode>,
)
