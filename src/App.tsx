import React from "react";
import { RouterProvider } from "react-router-dom";
import { useAppRouter } from "./routes/route";

const App = () => {
  const router = useAppRouter();

  return <RouterProvider router={router} />;
};

export default App;
