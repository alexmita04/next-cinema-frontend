import { useLocation, useNavigate } from "react-router";
import StripeCheckout from "@/components/items/StripeCheckout";

const Checkout = () => {
  let canLoadStripe: boolean = false;
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state.tickets) {
    canLoadStripe = true;
  }

  if (!canLoadStripe) {
    navigate("/cinemas");
  }

  return (
    <>{canLoadStripe && <StripeCheckout tickets={location.state.tickets} />}</>
  );
};

export default Checkout;
