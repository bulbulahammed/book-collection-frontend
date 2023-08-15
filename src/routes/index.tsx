import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllBooks from "../pages/AllBooks";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RecentBooks from "../pages/RecentBooks";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allBooks",
        element: <AllBooks />,
      },
      {
        path: "/recentBooks",
        element: <RecentBooks />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
