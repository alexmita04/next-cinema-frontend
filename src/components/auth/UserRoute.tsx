import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect, type ComponentType } from "react";

interface UserRouteInterface {
  Component: ComponentType;
}

const UserRoute = ({ Component }: UserRouteInterface) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [okToRender, setOkToRender] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setOkToRender(false);
      navigate("/login");
    } else if (isAdmin) {
      setOkToRender(false);
      navigate("/dashboard");
    } else {
      setOkToRender(true);
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return <>{okToRender && <Component />}</>;
};

export default UserRoute;
