import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { FindCreatorsPage } from "./pages/FindCreatorsPage";
import { ReelsPage } from "./pages/ReelsPage";
import { MessagesPage } from "./pages/MessagesPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CreatorProfilePage } from "./pages/CreatorProfilePage";
import { RequestHandlerPage } from "./pages/RequestHandlerPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "find-creators", Component: FindCreatorsPage },
      { path: "reels", Component: ReelsPage },
      { path: "messages", Component: MessagesPage },
      { path: "notifications", Component: NotificationsPage },
      { path: "profile", Component: ProfilePage },
      { path: "creator/:id", Component: CreatorProfilePage },
      { path: "request/:id", Component: RequestHandlerPage },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
