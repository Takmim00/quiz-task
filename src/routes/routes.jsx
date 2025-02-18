import { createBrowserRouter } from "react-router-dom";
import Home from "../component/Home";
import Main from "../outlet/Main";
import Scoreboard from "../component/Scoreboard";
import Questions from "../component/Questions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path:'/scoreboard',
        element:<Scoreboard/>
      },
      {
        path:'/question',
        element:<Questions/>
      }
    ]
  },
]);
