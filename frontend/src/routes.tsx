import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./features/Users/Dashboard"
import LoginContainer from "./features/Login/container/LoginContainer";
// import Home from "./features/Home/components/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element:<LoginContainer />,
  },
  {
    path: "/user-dashboard",
    element: <Dashboard/>
  }
]);

export default router;
