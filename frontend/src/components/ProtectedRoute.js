import { Navigate } from "react-router";
import useUser from "../hooks/useUser";
import { getAuth } from "firebase/auth";

export const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useUser();

    if (isLoading){
        return (<h1>Loading...</h1>);
    }

    if (!user){
        return <Navigate to="/log-in" />;
    }

  // If the user is authenticated, render the children components
  return children;
}