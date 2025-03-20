import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LoginContainer from "../features/Login/container/LoginContainer";
import AcceptInvitation from "../features/AcceptInvite/components/AcceptInvite";
import ProtectedRoute from "./ProtectedRoute";
// import Profile from "../features/Users/components/Profile";
import UserDashboard from "../features/Users/components";
import QueryDashboard from "../features/Query/components"
import CreateQuery from "../features/Query/components/CreateQuery";
import ViewQuery from "../features/Query/components/ViewQuery";
import Query from "../features/Query/components/Query";
import Help from "../features/Home/components/Help";
import ContactUs from "../features/Home/components/ContactUs";
import PendingResponse from "../features/Response/components/PendingResponse";
import UserManualGuide from "../features/Query/components/UserManual";


export const router = createBrowserRouter([
  {
    path: "/", // Redirect root "/" to "/login"
    element: <Navigate to="/login" replace />,
  },
  {
    path:"/help",
    element:<Help/>
  },
  {
    path:"/contact",
    element:<ContactUs/>
  },
  {
    path: "/app",
    element: <ProtectedRoute />,
    children:[
      {
        index: true,
        element: <App/>,
      }
    ]
  },
  {
    path: "/login",
    element:<LoginContainer />,
  },
  {
    path: "/accept-invite",
    element: <AcceptInvitation/>
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />, 
    children: [
      {
        index: true, 
        element: <UserDashboard />,
      },
    ],
  },
  {
    path:"/user-manual",
    element:<ProtectedRoute />,
    children:[
      {
        index:true,
        element:<UserManualGuide/>
      }
    ]
  },
  {
    path: "/queries",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "", // `/queries`
        element: <QueryDashboard />, // Wraps all query-related routes
        children: [
          {
            index: true, // `/queries`
            element: <Query />,
          },
          {
            path: "create", // `/queries/create`
            element: <CreateQuery />,
          },
          {
            path: ":queryId", // `/queries/:queryId`
            element: <ViewQuery />,
          },
          {
            path: "pending", // `/queries/pending
            element: <PendingResponse />,
          },
          {
            path:"user-manual",
            element:<UserManualGuide/>
          }
          
        ],
      },
    ],
  },
  
]);

export default router;
