import { useState, useEffect, useRef, useCallback } from "react";
import MovieScreeningInfo from "@/components/items/MovieScreeningInfo";
import SeatsDistribution from "@/components/items/SeatsDistribution";
import TicketsSelectedBox from "@/components/items/TicketsSelectedBox";
import { Link, useNavigate } from "react-router";
import { type ScreeningInterface } from "@/lib/backendTypes";
import ApiClient from "@/lib/apiClient";
import { useParams } from "react-router";
import CustomSpinner from "@/components/items/CustomSpinner";
import { type StripeTicketInterface } from "@/components/items/StripeCheckout";
import { useAuth } from "../auth/AuthContext";

export interface SelectedTicketsInterface {
  seatRow: number;
  seatNumber: number;
}

const SpecificScreening = () => {
  const [screening, setScreening] = useState<null | ScreeningInterface>(null);
  const [selectedTickets, setSelectedTickets] = useState<
    SelectedTicketsInterface[]
  >([]);
  const [bookedTickets, setBookedTickets] = useState<
    null | SelectedTicketsInterface[]
  >(null);
  const buyTicketsRef = useRef<HTMLDivElement | null>(null);
  const { auditoriumId, screeningId, cinemaId } = useParams();
  const { userId } = useAuth();

  const navigate = useNavigate();

  // fetch screening
  useEffect(() => {
    let isMounted = true;

    const fetchScreening = async () => {
      try {
        const response = await ApiClient.get(
          `/cinemas/${cinemaId}/auditoriums/${auditoriumId}/screenings/${screeningId}`
        );

        if (isMounted) {
          setScreening(response.data.data.screening);
        }
      } catch (err) {
        console.log(err);
        setScreening(null);
      }
    };

    fetchScreening();

    return () => {
      isMounted = false;
    };
  }, [cinemaId, auditoriumId, screeningId]);

  // fetch bookedTickers
  useEffect(() => {
    let isMounted = true;

    const fetchBookedTickets = async () => {
      try {
        const response = await ApiClient.get(
          `/tickets/screenings/${screeningId}`
        );

        if (isMounted) {
          const fetchedTickets = response.data.data.tickets;
          if (fetchedTickets.length) {
            setBookedTickets([
              ...fetchedTickets.map(
                (fetchedTicketEl: {
                  seat: { row: number; number: number };
                }) => ({
                  seatRow: fetchedTicketEl.seat.row,
                  seatNumber: fetchedTicketEl.seat.number,
                })
              ),
            ]);
          }
        }
      } catch (err) {
        console.log(err);
        setBookedTickets(null);
      }
    };

    fetchBookedTickets();

    return () => {
      isMounted = false;
    };
  }, [screeningId]);

  // scroll to buy tickets
  const scrollToBuyTickets = useCallback(() => {
    buyTicketsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const handleRedirectToCheckout = () => {
    console.log(userId);
    if (screening && selectedTickets.length && userId) {
      const checkoutTickets: StripeTicketInterface[] = selectedTickets.map(
        (ticket) => {
          return {
            totalPrice: screening.pricing,
            screeningId: screening._id,
            userId: userId,
            pricingCategory: "standard",
            seatRow: ticket.seatRow,
            seatNumber: ticket.seatNumber,
          };
        }
      );

      navigate("/checkout", {
        state: {
          tickets: checkoutTickets,
        },
      });
    }
  };

  return (
    <>
      {screening === null ? (
        <CustomSpinner size={4} />
      ) : (
        <>
          <MovieScreeningInfo
            movie={screening.movie}
            scrollToBuyTickets={scrollToBuyTickets}
          />
          <h2 className="mb-5 text-4xl font-bold">Screening Details</h2>
          <div className="flex flex-col gap-5 text-lg md:text-xl mb-10 ">
            <p className="border-b-2 pb-2">
              <span className="font-bold">Cinema:</span> {screening.cinema.name}
            </p>
            <p className="border-b-2 pb-2">
              <span className="font-bold">Auditorium:</span>{" "}
              {screening.auditorium.number}
            </p>
            <p className="border-b-2 pb-2">
              <span className="font-bold">Date:</span>{" "}
              {screening.date.slice(0, 10)}
            </p>
            <p className="border-b-2 pb-2">
              <span className="font-bold">Pricing:</span> ${screening.pricing}
            </p>
            <p className="border-b-2 pb-2">
              <span className="font-bold">Start Time:</span>{" "}
              {screening.startTime}
            </p>
            <p className="border-b-2 pb-2 text-base">
              If there is a wrong information get{" "}
              <Link to={`/cinemas/${screening.cinema._id}`}>
                <span className="text-red-500 underline">back</span>
              </Link>
            </p>
          </div>
          <div ref={buyTicketsRef} className="mb-10">
            <h2 className="text-4xl font-bold mb-5 xl:mb-10">Buy Tickets </h2>
            <p className="text-sm mb-5 xl:hidden">
              (SEE THE SELECTED TICKETS UNDER THE SEATS LAYOUT)
            </p>
            <div className="flex flex-col xl:flex-row gap-10 xl:gap-20">
              <SeatsDistribution
                setSelectedTickets={setSelectedTickets}
                bookedTickets={bookedTickets}
                selectedTickets={selectedTickets}
              />
              <div className="flex-grow">
                <TicketsSelectedBox
                  handleRedirectToCheckout={handleRedirectToCheckout}
                  selectedTickets={selectedTickets}
                  setSelectedTickets={setSelectedTickets}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SpecificScreening;
