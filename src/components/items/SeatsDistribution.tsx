import { type SelectedTicketsInterface } from "@/components/pages/SpecificScreening";
import SeatItem from "@/components/items/SeatItem";

const ROWS = 10;
const SEATS_PER_ROW = 10;
const SEATS_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const seats = Array.from({ length: ROWS }, () => {
  return Array(SEATS_PER_ROW).fill(0);
});

interface SeatsDistributionPropsInterface {
  setSelectedTickets: React.Dispatch<
    React.SetStateAction<SelectedTicketsInterface[]>
  >;
  bookedTickets: null | SelectedTicketsInterface[];
  selectedTickets: SelectedTicketsInterface[];
}

const checkIfSeatIsBooked = (
  rowIndex: number,
  numberIndex: number,
  bookedTickets: null | SelectedTicketsInterface[]
): boolean => {
  if (bookedTickets) {
    for (const bookedTicket of bookedTickets) {
      if (
        bookedTicket.seatRow === rowIndex + 1 &&
        bookedTicket.seatNumber === numberIndex + 1
      ) {
        return true;
      }
    }
  }

  return false;
};

const checkIfSeatIsSelected = (
  rowIndex: number,
  numberIndex: number,
  selectedTickets: SelectedTicketsInterface[]
) => {
  if (selectedTickets.length) {
    for (const ticket of selectedTickets) {
      if (ticket.seatRow === rowIndex && ticket.seatNumber === numberIndex) {
        return true;
      }
    }
  }

  return false;
};

const getSeatState = (
  rowIndex: number,
  numberIndex: number,
  bookedTickets: null | SelectedTicketsInterface[],
  selectedTickets: SelectedTicketsInterface[]
) => {
  if (checkIfSeatIsBooked(rowIndex, numberIndex, bookedTickets)) {
    return "booked";
  }

  if (checkIfSeatIsSelected(rowIndex, numberIndex, selectedTickets)) {
    return "selected";
  }

  return "notSelected";
};

const SeatsDistribution = ({
  setSelectedTickets,
  bookedTickets,
  selectedTickets,
}: SeatsDistributionPropsInterface) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="px-[100px] w-full md:px-[200px] py-2 bg-black text-white text-xl font-bold text-center block md:inline rounded-xl mb-10">
          SCREEN
        </div>
        <div className="flex flex-col gap-1 md:gap-2 px-4">
          {seats.map((rowEl, indexRow) => {
            return (
              <div
                className="flex items-center font-bold"
                key={`${rowEl}${indexRow}`}
              >
                <div className="w-8 md:w-10">{indexRow + 1}</div>
                <div className="flex gap-3 md:gap-5">
                  {rowEl.map((seat, indexSeat) => {
                    return (
                      <div
                        className="flex flex-col justify-center items-center gap-1 font-bold"
                        key={`${seat}${indexSeat}`}
                      >
                        {indexRow === 0 ? (
                          <div>{SEATS_LETTERS[indexSeat]}</div>
                        ) : (
                          ""
                        )}
                        <SeatItem
                          setSelectedTickets={setSelectedTickets}
                          seatState={getSeatState(
                            indexRow + 1,
                            indexSeat + 1,
                            bookedTickets,
                            selectedTickets
                          )}
                          row={indexRow + 1}
                          number={indexSeat + 1}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SeatsDistribution;
