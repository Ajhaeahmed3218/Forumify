import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Route/Router';
import AuthProvider from './Provider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
// ........tanStak------------->
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// ........tanStak------------->

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </QueryClientProvider>
    </AuthProvider>
  </HelmetProvider>
  ,
)
