import ThemeSwitch from "./components/ThemeSwitch";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => (
  <>
    <ThemeSwitch visibility="hidden" />
    <Login />
    {/* <Register /> */}
  </>
);

export default App;
