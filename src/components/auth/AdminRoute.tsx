import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect, type ComponentType } from "react";
import ApiClient from "@/lib/apiClient";

interface AdminRouteInterface {
  Component: ComponentType;
}

const AdminRoute = ({ Component }: AdminRouteInterface) => {
  const { isAuthenticated, isAdmin, setIsAdmin, setAccessToken } = useAuth();
  const [okToRender, setOkToRender] = useState<boolean>(false);
  const [isPossibleAdmin, setIsPossibleAdmin] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminRefresh = async () => {
      try {
        const response = await ApiClient.post("/users/refresh");

        if (response.data.data.accessToken) {
          setAccessToken(response.data.data.accessToken);
          setIsAdmin(true);
          setIsPossibleAdmin(false);
        }
      } catch (err) {
        setIsPossibleAdmin(false);
        setAccessToken(null);
        navigate("/login");
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };

    if (!isAuthenticated && isPossibleAdmin) {
      checkAdminRefresh();
    } else if (!isAuthenticated) {
      setOkToRender(false);
      setIsPossibleAdmin(false);
      navigate("/login");
    } else if (!isAdmin) {
      setIsPossibleAdmin(false);
      setOkToRender(false);
      navigate("/cinemas");
    } else {
      setOkToRender(true);
    }
  }, [
    isAuthenticated,
    isAdmin,
    navigate,
    isPossibleAdmin,
    setAccessToken,
    setIsAdmin,
  ]);

  return <>{okToRender && <Component />}</>;
};

export default AdminRoute;
