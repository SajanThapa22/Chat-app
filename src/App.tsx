import { RouterProvider, useParams } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useAppRouter } from "./routes/route";
import { ChatProvider } from "./context/ChatContext";

const App = () => {
  const router = useAppRouter();
  const { id } = useParams<{ id: string | undefined }>();

  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
