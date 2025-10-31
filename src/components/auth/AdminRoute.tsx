import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect, type ComponentType } from "react";

interface AdminRouteInterface {
  Component: ComponentType;
}

const AdminRoute = ({ Component }: AdminRouteInterface) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [okToRender, setOkToRender] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setOkToRender(false);
      navigate("/login");
    }
    if (!isAdmin) {
      setOkToRender(false);
      navigate("/cinemas");
    } else {
      setOkToRender(true);
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return <>{okToRender && <Component />}</>;
};

export default AdminRoute;
