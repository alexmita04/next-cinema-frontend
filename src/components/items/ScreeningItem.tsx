import { Button } from "@/components/ui/button";

interface ScreeningItemProps {
  auditoriums: string[];
  cinema: string;
  createdAt: string;
  date: string;
  language: string;
  movie: {
    title: string;
    coverImage: string;
    duration: number;
    genres: string[];
    director: string;
  };
  pricing: number;
  startTime: number;
  subtitle: string;
  updatedAt: string;
}

const hours = [
  "12:00 (Auditorium 1)",
  "12:00 (Auditorium 2)",
  "12:00 (Auditorium 3)",
  "14:00 (Auditorium 1)",
  "14:00 (Auditorium 2)",
  "14:00 (Auditorium 3)",
  "17:00 (Auditorium 1)",
  "17:00 (Auditorium 2)",
  "17:00 (Auditorium 3)",
  "22:00 (Auditorium 1)",
];

const ScreeningItem = ({ screening }: { screening: ScreeningItemProps }) => {
  return (
    <>
      <div className="relative flex gap-5 border-2 border-black rounded-lg">
        <img src={screening.movie.coverImage} alt="" />
        <div className="py-5 flex flex-col gap-5">
          <h3 className="text-2xl font-medium">{screening.movie.title}</h3>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {hours.map((hourEl) => {
              return (
                <Button key={hourEl} size="lg" variant="outline">
                  {hourEl}
                </Button>
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
