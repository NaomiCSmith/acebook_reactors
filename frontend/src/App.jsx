import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { CreatePost } from "./pages/Create/CreatePost";
import { WelcomePage } from "./pages/Welcome/WelcomePage";
import { Profile } from "./pages/Profile/Profile";
import {UserProfile} from "./pages/UserProfile/UserProfile"

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/posts",
    element: <FeedPage />,
  },
  {
    path: "/createpost",
    element: <CreatePost />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/userprofile/:userId",
    element: <UserProfile />
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
