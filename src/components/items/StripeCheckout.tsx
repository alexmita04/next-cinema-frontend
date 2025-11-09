import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import ApiClient from "@/lib/apiClient";

const STRIPE_PUBLIC_KEY =
  "pk_test_51SFH3gRElVTmok8XrCdZwt0p1tKTPfGIshBHh1osYKm3ytaTcyT8ap3x3QjljOQcEuXh63Q6emS5WA11xRfUodIH00MRTUAXtB";
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// const dummyTickets = [
//   {
//     totalPrice: 10,
//     screeningId: "690715a61fe14365812ccce5",
//     userId: "6901eccbca9e8924cbb526fc",
//     pricingCategory: "standard",
//     seatRow: 5,
//     seatNumber: 5,
//   },
//   {
//     totalPrice: 10,
//     screeningId: "690715a61fe14365812ccce5",
//     userId: "6901eccbca9e8924cbb526fc",
//     pricingCategory: "standard",
//     seatRow: 5,
//     seatNumber: 6,
//   },
// ];

export interface StripeTicketInterface {
  totalPrice: number;
  screeningId: string;
  userId: string;
  pricingCategory: string;
  seatRow: number;
  seatNumber: number;
}

function StripeCheckout({ tickets }: { tickets: StripeTicketInterface[] }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        setLoading(true);
        const response = await ApiClient.post(
          "/tickets/create-checkout-session",
          { tickets }
        );

        setClientSecret(response.data.data.clientSecret);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [tickets]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!clientSecret) return <div>Unable to initialize checkout</div>;

  return (
    <>
      <div>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </>
  );
}

export default StripeCheckout;
