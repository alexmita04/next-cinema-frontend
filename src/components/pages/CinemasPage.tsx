import { useEffect, useState } from "react";
import { Link } from "react-router";
import CustomSpinner from "@/components/items/CustomSpinner";
import { type MovieInterface, type CinemaInterface } from "@/lib/backendTypes";
import ApiClient from "@/lib/apiClient";

import CinemaItem from "@/components/items/CinemaItem";
import MovieItem from "@/components/items/MovieItem";

const CinemasPage = () => {
  const [movies, setMovies] = useState<null | MovieInterface[]>(null);
  const [cinemas, setCinemas] = useState<null | CinemaInterface[]>(null);

  // movie fetch
  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        const response = await ApiClient.get("/movies");

        if (isMounted) {
          setMovies(response.data.data.movies);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) setMovies(null);
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  // cinema fetch
  useEffect(() => {
    let isMounted = true;

    const fetchCinemas = async () => {
      try {
        const response = await ApiClient.get("/cinemas");

        if (isMounted) {
          setCinemas(response.data.data.cinemas);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) setCinemas(null);
      }
    };

    fetchCinemas();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="mt-15">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-10">
            Choose your Cinema
          </h1>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-5 mb-10">
            {cinemas === null ? (
              <CustomSpinner size={4} />
            ) : (
              cinemas.map((cinemaEl) => {
                return (
                  <Link to={`/cinemas/${cinemaEl._id}`} key={cinemaEl._id}>
                    <CinemaItem
                      name={cinemaEl.name}
                      location={cinemaEl.location}
                      parking={cinemaEl.parking}
                    />
                  </Link>
                );
              })
            )}
          </div>
        </div>
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-10">Movies</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-6 md:grid-cols-3 gap-5 mb-10">
            {movies === null ? (
              <CustomSpinner size={4} />
            ) : (
              movies.map((movieEl) => {
                return (
                  <MovieItem
                    key={movieEl._id}
                    title={movieEl.title}
                    coverImage={movieEl.coverImage}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CinemasPage;
