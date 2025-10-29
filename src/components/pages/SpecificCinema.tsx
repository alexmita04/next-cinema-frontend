import DatePicker from "@/components/items/DatePicker";
import ScreeningItem from "@/components/items/ScreeningItem";
import { Link } from "react-router";

import cinemas from "@/components/items/cinemasData";
const cinema = cinemas[1];
import screening from "@/components/items/screening.json";
const screenings = Array(9).fill(screening);

const SpecificCinema = () => {
  return (
    <>
      <div className="mt-15">
        <h1 className="text-5xl font-bold mb-7">{cinema.name}</h1>
        <div className="mb-7">
          <DatePicker />
        </div>
        <h2 className="text-3xl mb-5">Screenings</h2>
        <div className="flex flex-col gap-5">
          {screenings.map((screeningEl, index) => {
            return (
              <Link to={`/cinemas/${cinema._id}/screenings/${screeningEl._id}`}>
                <ScreeningItem
                  key={screeningEl._id + index}
                  screening={screeningEl}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SpecificCinema;
