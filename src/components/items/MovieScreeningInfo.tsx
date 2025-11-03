import { Button } from "@/components/ui/button";
import { type MovieInterface } from "@/lib/backendTypes";

interface MovieScreeningInfoProps {
  movie: MovieInterface;
  scrollToBuyTickets: () => void;
}

const MovieScreeningInfo = ({
  movie,
  scrollToBuyTickets,
}: MovieScreeningInfoProps) => {
  const trailerUrl: string = movie.trailer;
  const embedLinkString: string = trailerUrl.replace(
    "youtu.be/",
    "www.youtube.com/embed/"
  );

  return (
    <>
      <div className="flex flex-wrap justify-between items-center mt-10 mb-5">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5">
          {movie.title}
        </h1>
        <Button
          className="px-15 py-7 mb-5"
          size="lg"
          onClick={scrollToBuyTickets}
        >
          Buy tickets
        </Button>
      </div>
      <div>
        <div className="flex border-2 border-black rounded-lg overflow-hidden lg:h-[600px] mb-5">
          <img
            src={movie.coverImage}
            alt="movie cover image"
            className="border-r-5 border-red-500 flex-grow-1 lg:flex-grow-0"
          />
          <iframe
            className="flex-grow hidden lg:block"
            src={embedLinkString}
            title="Saving Private Ryan (1998) - Modern Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex flex-col gap-5 text-lg md:text-xl mb-10">
          <div className="border-b-2 pb-2">
            <span className="font-bold">Release Date:</span>{" "}
            {`${movie.releaseDate.slice(0, 10)}`}
          </div>
          <div className="border-b-2 pb-2">
            <span className="font-bold">Duration:</span> {movie.duration} min
          </div>
          <div className="border-b-2 pb-2">{movie.description}</div>
          <div className="border-b-2 pb-2">
            <span className="font-bold">Genres:</span> {movie.genres.join(", ")}
          </div>
          <div className="border-b-2 pb-2">
            <span className="font-bold">Distribution:</span>{" "}
            {movie.distribution}
          </div>
          <div className="border-b-2 pb-2">
            <span className="font-bold">Production:</span> {movie.production}
          </div>
          <div className="border-b-2 pb-2">
            <span className="font-bold">Director:</span> {movie.director}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieScreeningInfo;
