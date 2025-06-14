import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Layout from './Layout/Layout';
import Home from './Components/Home/Home';

// import JobGrid from './Components/JobGrid/JobGrid';
// import JobListingApp from './Components/JobListingapp/JobListingApp';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/search-jobs" element={<JobListingApp />} />
        <Route path="/post-job" element={<JobGrid />} /> */}
      </Route>
    </>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();