import CinemaItem from "@/components/items/CinemaItem";
import MovieItem from "@/components/items/MovieItem";

import cinemas from "@/components/items/cinemasData";
import movies from "@/components/items/moviesData.json";

const CinemasPage = () => {
  return (
    <>
      <div className="mt-15">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-10">
            Choose your Cinema
          </h1>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-5 mb-10">
            {cinemas.map((cinemaEl) => {
              return (
                <CinemaItem
                  key={cinemaEl._id}
                  name={cinemaEl.name}
                  location={cinemaEl.location}
                  parking={cinemaEl.parking}
                />
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-10">Movies</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-6 md:grid-cols-3 gap-5 mb-10">
            {movies.map((movieEl) => {
              return (
                <MovieItem
                  key={movieEl._id}
                  title={movieEl.title}
                  coverImage={movieEl.coverImage}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CinemasPage;
