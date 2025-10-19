// import { Button } from "@/components/ui/button";
import MovieScreeningInfo from "@/components/items/MovieScreeningInfo";
import SeatsDistribution from "@/components/items/SeatsDistribution";
import TicketsSelectedBox from "@/components/items/TicketsSelectedBox";

import screening from "@/components/items/screening.json";

const SpecificScreening = () => {
  const trailerUrl: string = screening.movie.trailer;
  const embedLinkString: string = trailerUrl.replace(
    "youtu.be/",
    "www.youtube.com/embed/"
  );

  return (
    <>
      <MovieScreeningInfo
        movie={screening.movie}
        embedLinkString={embedLinkString}
      />
      <h2 className="mb-5 text-4xl font-bold">Screening Details</h2>
      <div className="flex flex-col gap-5 text-lg md:text-xl mb-10 ">
        <p className="border-b-2 pb-2">
          <span className="font-bold">Cinema:</span> Cinema x
        </p>
        <p className="border-b-2 pb-2">
          <span className="font-bold">Auditorium:</span> Auditorium 2
        </p>
        <p className="border-b-2 pb-2">
          <span className="font-bold">Date:</span> 2025-10-10
        </p>
        <p className="border-b-2 pb-2">
          <span className="font-bold">Pricing:</span> 25$
        </p>
        <p className="border-b-2 pb-2">
          <span className="font-bold">Start Time:</span> 15:00
        </p>
        <p className="border-b-2 pb-2 text-base">
          If there is a wrong information get{" "}
          <a href="#" className="text-red-500 underline">
            back
          </a>
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-5 xl:mb-10">Buy Tickets </h2>
        <p className="text-sm mb-5 xl:hidden">
          (SEE THE SELECTED TICKETS UNDER THE SEATS LAYOUT)
        </p>
        <div className="flex flex-col xl:flex-row gap-10 xl:gap-20">
          <SeatsDistribution />
          <div className="flex-grow">
            <TicketsSelectedBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificScreening;
