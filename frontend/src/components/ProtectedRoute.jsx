import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const ProtectedRoute = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        await api.get("/auth/me");

        setIsAuth(true);

      } catch (error) {
        console.log(error)

        setIsAuth(false);
      }

      setLoading(false);
    };

    checkAuth();

  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;