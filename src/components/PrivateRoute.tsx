import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
    component: React.ComponentType<any>
}

const PrivateRoute = ({ component: Component }:) => {

    const {isLoggedIn} = useAuth()
 
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
    const checkAuth = async () => {
        const result = await isLoggedIn();
        setIsAuthenticated(result);
    }
    checkAuth()
}, [isLoggedIn])

 // Your authentication logic goes here...
 
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;