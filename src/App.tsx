import { RouterProvider } from "react-router-dom";
import { useAppRouter } from "./routes/route";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
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
