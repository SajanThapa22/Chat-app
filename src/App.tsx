import { RouterProvider } from "react-router-dom";
import { useAppRouter } from "./routes/route";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const router = useAppRouter();

  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
