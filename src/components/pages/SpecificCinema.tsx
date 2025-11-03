import DatePicker from "@/components/items/DatePicker";
import ScreeningItem, {
  type ScreeningItemProps,
} from "@/components/items/ScreeningItem";
import CustomSpinner from "@/components/items/CustomSpinner";
import {
  type CinemaInterface,
  type AuditoriumInterface,
  type MovieInterface,
} from "@/lib/backendTypes";
import ApiClient from "@/lib/apiClient";
import { useParams } from "react-router";
import { useState, useEffect, useCallback } from "react";

interface ScreeningInterface {
  _id: string;
  auditorium: AuditoriumInterface;
  movie: MovieInterface;
  cinema: string;
  date: string;
  startTime: number;
  pricing: number;
  language: string;
  subtitle: string;
}

const startOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const formatDate = (date: Date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  return `${year}-${month}-${day}`;
};

const SpecificCinema = () => {
  const [cinema, setCinema] = useState<null | CinemaInterface>(null);
  const [screenings, setScreenings] = useState<null | ScreeningItemProps[]>(
    null
  );
  const [date, setDate] = useState<Date>(startOfToday);
  const { cinemaId } = useParams();

  // cinema fetch
  useEffect(() => {
    let isMounted = true;

    const fetchMovie = async () => {
      try {
        const response = await ApiClient.get(`/cinemas/${cinemaId}`);

        if (isMounted) {
          setCinema(response.data.data.cinema);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) setCinema(null);
      }
    };

    fetchMovie();

    return () => {
      isMounted = false;
    };
  }, [cinemaId]);

  // aggregate screenings by movie
  const aggregateScreenings = useCallback(
    (screenings: ScreeningInterface[]) => {
      const aggregatedScreenings: ScreeningItemProps[] = [];

      screenings.forEach((screeningEl) => {
        const index = aggregatedScreenings.findIndex((aggEl) => {
          return aggEl.movie._id === screeningEl.movie._id;
        });

        if (index !== -1) {
          aggregatedScreenings[index].auditoriums.push({
            start: `${screeningEl.startTime}:00 (Auditorium ${screeningEl.auditorium.number})`,
            _id: screeningEl.auditorium._id,
          });
        } else {
          const newAggScreening = {
            _id: screeningEl._id,
            auditoriums: [
              {
                start: `${screeningEl.startTime}:00 (Auditorium ${screeningEl.auditorium.number})`,
                _id: screeningEl.auditorium._id,
              },
            ],
            movie: screeningEl.movie,
            startTime: screeningEl.startTime,
            cinemaId: screeningEl.cinema,
          };
          aggregatedScreenings.push(newAggScreening);
        }
      });

      return aggregatedScreenings;
    },
    []
  );

  // screenings fetch
  useEffect(() => {
    let isMounted = true;

    const fetchScreenings = async () => {
      try {
        if (cinema !== null) {
          const response = await ApiClient.get(
            `/cinemas/${cinema._id}/screenings?date=${formatDate(date)}`
          );

          if (isMounted) {
            setScreenings(aggregateScreenings(response.data.data.screenings));
          }
        }
      } catch (err) {
        console.log(err);
        if (isMounted) setScreenings(null);
      }
    };

    fetchScreenings();

    return () => {
      isMounted = false;
    };
  }, [cinema, aggregateScreenings, date]);

  const datePickerHandler = (date: Date | undefined) => {
    if (date) setDate(date);
  };

  return (
    <>
      <div className="mt-15">
        {cinema === null ? (
          <CustomSpinner size={4} />
        ) : (
          <>
            <h1 className="text-5xl font-bold mb-7">{cinema.name}</h1>
            <div className="mb-7">
              <DatePicker value={date} onChange={datePickerHandler} />
            </div>
            <h2 className="text-3xl mb-5">Screenings</h2>
            {screenings?.length === 0 && <div>0 screenings on this date</div>}
            <div className="flex flex-col gap-5">
              {screenings === null ? (
                <CustomSpinner size={4} />
              ) : (
                screenings.map((screeningEl) => {
                  return (
                    <ScreeningItem
                      key={screeningEl._id}
                      screening={screeningEl}
                    />
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SpecificCinema;
