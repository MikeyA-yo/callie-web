import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.tsx";
import Join from "./components/join.tsx";
import Dl from "./components/dl.tsx";
import Meeting from "./components/meeting.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/join",
        element: <Join />,
      },
      {
        path:"/dl",
        element:<Dl />
      }
    ],
  },
  {
    path:"/join/:roomID",
    element: <Meeting />
  }
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
