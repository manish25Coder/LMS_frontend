import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  // 🔐 Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ⏳ Role not loaded yet (page refresh case)
  if (!role) {
    return null; // or loader
  }

  // ❌ Role not allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/denied" replace />;
  }

  // ✅ Authorized
  return <Outlet />;
}

export default RequireAuth;
