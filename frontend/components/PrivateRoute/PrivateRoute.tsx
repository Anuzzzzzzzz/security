// src/components/PrivateRoute.tsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../src/store/store";

const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.user);  // Ensure you're accessing state correctly
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
