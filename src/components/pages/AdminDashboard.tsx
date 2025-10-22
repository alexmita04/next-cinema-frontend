import ChartAdmin from "@/components/items/ChartAdmin";
import TicketsTable from "@/components/items/TicketsTable";
import DatePicker from "@/components/items/DatePicker";
import { type ColumnDef } from "@tanstack/react-table";
import movies from "@/components/items/moviesData.json";
import screening from "@/components/items/screening.json";
import MovieItem from "@/components/items/MovieItem";
import AdminScreeningCard from "@/components/items/AdminScreeningCard";
import { Button } from "@/components/ui/button";

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

const tickets: Ticket[] = [
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving Private Ryan",
    totalPrice: 20,
  },
  {
    screeningId: "68ef7d1a5c123b456e7f8d90",
    movie: "Saving test Ryan",
    totalPrice: 20,
  },
];

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

const cinema = {
  _id: "68ecf08c52e10981ea3f2d11",
  name: "CityPlex Downtown",
  location: "Main Street 123, Downtown, NY",
  auditoriums: [
    { name: "A", capacity: 200, screenType: "4DX" },
    { name: "B", capacity: 180, screenType: "Standard" },
    { name: "C", capacity: 180, screenType: "Standard" },
  ],
  openingHour: 10,
  closingHour: 24,
  email: "contact@cityplexdowntown.com",
  parking: false,
  admin: "68ecf08f52e10981ea3f2d9c",
  createdAt: "2025-10-14T10:00:00.000Z",
  updatedAt: "2025-10-14T18:30:00.000Z",
  __v: 0,
};

const screenings = Array(5).fill(screening);

const AdminDashboard = () => {
  const today = new Date();

  const chartData: { date: string; tickets: number }[] = [];

  for (let day = -chartRange.before; day <= 0; day++) {
    const targetDate = new Date(today);

    targetDate.setDate(today.getDate() + day);

    const formatedDate = formatDate(targetDate);

    chartData.push({
      date: formatedDate,
      tickets: Math.floor(Math.random() * 5),
    });
  }

  return (
    <>
      <h1 className="text-5xl mt-20 mb-10 font-bold">Admin Dashboard</h1>
      <div className="mb-10">
        <DatePicker />
      </div>
      <div className="mb-10">
        {" "}
        <ChartAdmin chartData={chartData} />
      </div>
      <div className="mb-10">
        <TicketsTable columns={columns} data={tickets} />
      </div>
      <div className="mb-10">
        <h2 className="text-5xl font-bold mb-5">Cinema Information</h2>
        <p className="text-xl p-2 border-b-2">{cinema.name}</p>
        <p className="text-xl p-2 border-b-2">Location: {cinema.location}</p>
        <p className="text-xl p-2 border-b-2">
          Program: {cinema.openingHour} - {cinema.closingHour}
        </p>
        <p className="text-xl p-2 border-b-2">Email: {cinema.email}</p>
        <p className="text-xl p-2 border-b-2">
          Parking: {cinema.parking ? "yes" : "no"}
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-5xl font-bold mb-5">Your Screenings</h2>
        <div className="flex flex-col gap-5">
          {screenings.map((screeningEl, index) => {
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
          Add Screening
        </Button>
      </div>
      <div>
        <h2 className="text-5xl font-bold mb-5">Movies</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-6 md:grid-cols-3 gap-5 mb-10">
          {movies.map((movielEl, index) => {
            return (
              <MovieItem
                key={index}
                title={movielEl.title}
                coverImage={movielEl.coverImage}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
