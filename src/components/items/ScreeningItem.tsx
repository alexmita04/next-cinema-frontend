import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export interface ScreeningItemProps {
  _id: string;
  auditoriums: { start: string; _id: string }[];
  movie: {
    _id: string;
    title: string;
    coverImage: string;
    duration: number;
    genres: string[];
    director: string;
  };
  startTime: number;
  cinemaId: string;
}

const ScreeningItem = ({ screening }: { screening: ScreeningItemProps }) => {
  return (
    <>
      <div className="relative flex gap-5 border-2 border-black rounded-lg">
        <img
          src={screening.movie.coverImage}
          alt=""
          className="hidden sm:block"
        />
        <div className="pl-5 sm:pl-0 py-5 flex flex-col gap-5">
          <h3 className="text-2xl font-bold">{screening.movie.title}</h3>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {screening.auditoriums.map((auditoriumEl) => {
              return (
                <Link
                  key={`${auditoriumEl._id}${screening._id}`}
                  to={`/cinemas/${screening.cinemaId}/screenings/${screening._id}`}
                >
                  <Button key={auditoriumEl._id} size="sm" variant="outline">
                    {auditoriumEl.start}
                  </Button>
                </Link>
              );
            })}
          </div>
          <div>
            {screening.movie.genres.join(", ")} | {screening.movie.duration} min
          </div>
          <div>Director: {screening.movie.director}</div>
        </div>
      </div>
    </>
  );
};

export default ScreeningItem;
