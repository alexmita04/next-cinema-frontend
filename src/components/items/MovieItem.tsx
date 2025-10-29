interface MovieItemProps {
  title: string;
  coverImage: string;
}

const MovieItem = ({ title, coverImage }: MovieItemProps) => {
  return (
    <div className="border-4 border-red-500 rounded-lg relative w-full h-96 overflow-hidden group">
      <img
        src={coverImage}
        alt="movie cover image"
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-red-500/80 to-transparent transition-all duration-300 ease-in-out group-hover:h-full"></div>{" "}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-white text-center">
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
    </div>
  );
};

export default MovieItem;
