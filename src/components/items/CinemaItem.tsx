interface CinemaItemProps {
  name: string;
  location: string;
  parking: boolean;
}

const CinemaItem = ({ name, location, parking }: CinemaItemProps) => {
  return (
    <>
      <div className="border-black border-2 rounded-lg p-3 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer lg:h-[108px] relative overflow-hidden group">
        <h3 className="text-2xl">{name}</h3>
        <p>{location}</p>
        <p>Parking: {parking ? "yes" : "no"}</p>
        <div className="w-[30px] h-full bg-black absolute right-0 top-0"></div>
        <div className="w-[30px] h-full bg-black absolute right-[30px] top-40 rounded-2xl group-hover:top-10 transition-[top] duration-300"></div>
      </div>
    </>
  );
};

export default CinemaItem;
