import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from 'react-redux';
import { store } from './app/store';
import { RouterProvider } from "react-router-dom";
import router from "./root/routes"; // Import your routes
import "./index.css";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)

