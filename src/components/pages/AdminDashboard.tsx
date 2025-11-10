import { useState, useEffect } from "react";
import ChartAdmin from "@/components/items/ChartAdmin";
import TicketsTable from "@/components/items/TicketsTable";
import DatePicker from "@/components/items/DatePicker";
import { type ColumnDef } from "@tanstack/react-table";
import MovieItem from "@/components/items/MovieItem";
import AdminScreeningCard from "@/components/items/AdminScreeningCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  type CinemaInterface,
  type ScreeningInterface,
  type TicketInterface,
  type MovieInterface,
} from "@/lib/backendTypes";
import CustomSpinner from "@/components/items/CustomSpinner";
import ApiClient from "@/lib/apiClient";

function formatDate(dateObj: Date): string {
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const chartRange = {
  before: 6,
};

interface Ticket {
  screeningId: string;
  movie: string;
  totalPrice: number;
}

const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "screeningId",
    header: "Screening",
    cell: ({ row }) => {
      const screeningId: string = row.getValue("screeningId");
      return (
        <div className="">
          <a href="#" className="text-red-500 text-right font-medium">
            {screeningId}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "movie",
    header: "Movie",
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
  },
];

interface TableTicketInterace {
  screeningId: string;
  movie: string;
  totalPrice: number;
  createdAt: Date;
}

const countTickets = (tickets: TableTicketInterace[], date: Date) => {
  let ticketCounter = 0;

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const startOfNextDay = new Date(date);
  startOfNextDay.setDate(startOfDay.getDate() + 1);

  for (const ticket of tickets) {
    const ticketDate = new Date(ticket.createdAt);

    if (ticketDate >= startOfDay && ticketDate < startOfNextDay)
      ticketCounter++;
  }
  return ticketCounter;
};

const AdminDashboard = () => {
  const [cinema, setCinema] = useState<null | CinemaInterface>(null);
  const [screenings, setScreenings] = useState<null | ScreeningInterface[]>(
    null
  );
  const [tickets, setTickets] = useState<null | TableTicketInterace[]>(null);
  const [movies, setMovies] = useState<null | MovieInterface[]>(null);
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now()));

  console.log(date);

  // fetch cinema information
  useEffect(() => {
    let isMounted = true;

    const fetchCinema = async () => {
      const response = await ApiClient.get("/users/reports/sales");

      if (isMounted) {
        //cinema
        setCinema(response.data.data.cinema);

        //screenings
        if (response.data.data.screenings) {
          setScreenings(response.data.data.screenings);
        } else {
          setScreenings(null);
        }

        //tickets
        if (response.data.data.allTickets) {
          const tableTickets = response.data.data.allTickets.map(
            (t: TicketInterface & { movie: string; createdAt: Date }) => {
              return {
                screeningId: t.screening,
                movie: t.movie,
                totalPrice: t.totalPrice,
                createdAt: t.createdAt,
              };
            }
          );
          setTickets(tableTickets);
        } else {
          setTickets(null);
        }
      }
    };

    fetchCinema();

    return () => {
      isMounted = false;
    };
  }, []);

  // fetch movies information
  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      const response = await ApiClient.get("/movies");

      if (isMounted) {
        setMovies(response.data.data.movies);
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  // Chart and calendar
  const today = new Date();

  const chartData: { date: string; tickets: number }[] = [];

  for (let day = -chartRange.before; day <= 0; day++) {
    if (date && tickets) {
      const targetDate = new Date(date);

      targetDate.setDate(date.getDate() + day);

      const formatedDate = formatDate(targetDate);

      chartData.push({
        date: formatedDate,
        tickets: countTickets(tickets, targetDate),
      });
    } else {
      const targetDate = new Date(today);

      targetDate.setDate(today.getDate() + day);

      const formatedDate = formatDate(targetDate);

      chartData.push({
        date: formatedDate,
        tickets: 0,
      });
    }
  }

  const onDateChange = (date: Date | undefined) => {
    setDate(date);
  };

  return (
    <>
      <h1 className="text-5xl mt-20 mb-10 font-bold">Admin Dashboard</h1>
      <div className="mb-10">
        <DatePicker value={date} onChange={onDateChange} />
      </div>
      <div className="mb-10">
        {" "}
        <ChartAdmin chartData={chartData} />
      </div>
      <div className="mb-10">
        {!tickets ? (
          <CustomSpinner size={4} />
        ) : (
          <>
            <TicketsTable columns={columns} data={tickets} />
          </>
        )}
      </div>
      <div className="mb-10">
        <h2 className="text-5xl font-bold mb-5">Cinema Information</h2>
        {!cinema ? (
          <CustomSpinner size={4} />
        ) : (
          <>
            <p className="text-xl p-2 border-b-2">{cinema.name}</p>
            <p className="text-xl p-2 border-b-2">
              Location: {cinema.location}
            </p>
            <p className="text-xl p-2 border-b-2">
              Program: {cinema.openingHour} - {cinema.closingHour}
            </p>
            <p className="text-xl p-2 border-b-2">Email: {cinema.email}</p>
            <p className="text-xl p-2 border-b-2">
              Parking: {cinema.parking ? "yes" : "no"}
            </p>
          </>
        )}
      </div>
      <div className="mb-10">
        <h2 className="text-5xl font-bold mb-5">Your Screenings</h2>
        <div className="flex flex-col gap-5">
          {screenings?.map((screeningEl, index) => {
            return (
              <AdminScreeningCard
                key={screeningEl._id + index}
                movieTitle={screeningEl.movie.title}
                screeningId={screeningEl._id}
              />
            );
          })}
        </div>
        <Button size="lg" className="mt-5 mb-5 text-xl px-10 py-7">
          <Link to={`/dashboard/screenings/add-screening`}>Add Screening</Link>
        </Button>
      </div>
      <div>
        <h2 className="text-5xl font-bold mb-5">Movies</h2>
        {!movies ? (
          <CustomSpinner size={4} />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 xl:grid-cols-6 md:grid-cols-3 gap-5 mb-10">
              {movies.map((movielEl, index) => {
                return (
                  <MovieItem
                    title={movielEl.title}
                    key={index}
                    coverImage={movielEl.coverImage}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
