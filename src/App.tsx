import { RouterProvider } from "react-router-dom";
import { useAppRouter } from "./router";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatHistoryProvider } from "./contexts/ChatHistoryContext";

const App = () => {
  const router = useAppRouter();

  return (
    <AuthProvider>
      <ChatHistoryProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ChatHistoryProvider>
    </AuthProvider>
  );
};

export default App;
