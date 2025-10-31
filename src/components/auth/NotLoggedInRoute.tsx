import { useState, useEffect, type ComponentType } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router";

interface NotLoggedInRouteProps {
  Component: ComponentType;
}

const NotLoggedInRoute = ({ Component }: NotLoggedInRouteProps) => {
  const [okToRender, setOkToRender] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  const navigator = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigator("/cinemas");
      setOkToRender(false);
    } else {
      setOkToRender(true);
    }
  }, [isAuthenticated, navigator]);

  return <>{okToRender && <Component />}</>;
};

export default NotLoggedInRoute;
