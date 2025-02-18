import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import QuizProvider from "./component/provider/QuizProvider";
import "./index.css";
import { router } from "./routes/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizProvider>
      <RouterProvider router={router} />
    </QuizProvider>
  </StrictMode>
);
