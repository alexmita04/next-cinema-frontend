import { type SelectedTicketsInterface } from "@/components/pages/SpecificScreening";

interface SeatItemPropsInterface {
  setSelectedTickets: React.Dispatch<
    React.SetStateAction<SelectedTicketsInterface[]>
  >;
  seatState: "booked" | "selected" | "notSelected";
  row: number;
  number: number;
}

const SeatItem = ({
  setSelectedTickets,
  seatState,
  row,
  number,
}: SeatItemPropsInterface) => {
  const handleNotSelected = () => {
    setSelectedTickets((selectedTickets) => {
      return [...selectedTickets, { seatRow: row, seatNumber: number }];
    });
  };

  const handleSelected = () => {
    setSelectedTickets((selectedTickets) => {
      return selectedTickets.filter((ticket) => {
        return !(ticket.seatNumber === number && ticket.seatRow === row);
      });
    });
  };

  const handleClick = () => {
    switch (seatState) {
      case "booked":
        break;
      case "selected":
        handleSelected();
        break;
      case "notSelected":
        handleNotSelected();
        break;
    }
  };

  return (
    <>
      <div
        className={`${
          seatState === "booked"
            ? "bg-orange-500  hover:bg-orange-800"
            : seatState === "selected"
            ? "bg-red-500  hover:bg-red-800"
            : "bg-blue-500  hover:bg-blue-800"
        } h-5 w-5 md:h-10 md:w-10 rounded-t-3xl flex justify-center items-center font-bold text-white cursor-pointer`}
        onClick={handleClick}
      ></div>
    </>
  );
};

export default SeatItem;
