import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useAppRouter } from "./routes/route";
import { ChatHistoryProvider } from "./context/ChatHistoryContext";

const App = () => {
  const router = useAppRouter();

  return (
    <AuthProvider>
      <ThemeProvider>
        <ChatHistoryProvider>
          <RouterProvider router={router} />
        </ChatHistoryProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
