import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router";
import { useState, useEffect, type ComponentType } from "react";
import ApiClient from "@/lib/apiClient";

interface UserRouteInterface {
  Component: ComponentType;
}

const UserRoute = ({ Component }: UserRouteInterface) => {
  const { isAuthenticated, isAdmin, setAccessToken, setUserId, setIsAdmin } =
    useAuth();
  const [okToRender, setOkToRender] = useState<boolean>(false);
  const [isPossibleUser, setIsPossibleUser] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRefresh = async () => {
      try {
        const response = await ApiClient.post("/users/refresh");

        if (response.data.data.accessToken) {
          setAccessToken(response.data.data.accessToken);
          setUserId(response.data.data.id);
          if (response.data.data.isAdmin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
          setIsPossibleUser(false);
        }
      } catch (err) {
        setIsPossibleUser(false);
        setAccessToken(null);
        navigate("/login");
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };

    if (!isAuthenticated && isPossibleUser) {
      checkUserRefresh();
    } else if (!isAuthenticated) {
      setOkToRender(false);
      setIsPossibleUser(false);
      navigate("/login");
    } else if (isAdmin) {
      setIsPossibleUser(false);
      setOkToRender(false);
      navigate("/dashboard");
    } else {
      setOkToRender(true);
    }
  }, [
    isAuthenticated,
    isAdmin,
    navigate,
    isPossibleUser,
    setAccessToken,
    setUserId,
    setIsAdmin,
  ]);

  return <>{okToRender && <Component />}</>;
};

export default UserRoute;
