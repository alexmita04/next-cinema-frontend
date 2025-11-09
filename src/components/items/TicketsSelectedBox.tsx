import { Button } from "@/components/ui/button";
import { type SelectedTicketsInterface } from "@/components/pages/SpecificScreening";

// const ticketsData = [
//   { seat: "A", row: "6" },
//   { seat: "B", row: "6" },
// ];

interface TicketsSelectedBoxInterface {
  handleRedirectToCheckout: () => void;
  selectedTickets: SelectedTicketsInterface[];
  setSelectedTickets: React.Dispatch<
    React.SetStateAction<SelectedTicketsInterface[]>
  >;
}

const TicketsSelectedBox = ({
  handleRedirectToCheckout,
  selectedTickets,
  setSelectedTickets,
}: TicketsSelectedBoxInterface) => {
  const handleDelete = (row: number, number: number) => {
    setSelectedTickets((tickets) => {
      return tickets.filter((t) => {
        return !(t.seatNumber === number && t.seatRow === row);
      });
    });
  };

  return (
    <>
      <div className="border-3 border-black rounded-lg p-10">
        <p className="text-2xl font-medium mb-1">Tickets Selected </p>
        <p className="text-sm mb-4">(You can select maximum 2 tickets)</p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
          {selectedTickets.map((ticketEl) => {
            return (
              <div
                className="flex flex-col items-center border-2 border-black p-4 rounded-lg"
                key={`${ticketEl.seatRow}${ticketEl.seatNumber}`}
              >
                <p className="text-sm md:text-lg">
                  Ticket <span>{ticketEl.seatRow + ticketEl.seatNumber}</span>
                </p>
                {/* <a href="#" className="text-red-500">
                  delete
                </a> */}
                <Button
                  className="mt-2"
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => {
                    handleDelete(ticketEl.seatRow, ticketEl.seatNumber);
                  }}
                >
                  delete
                </Button>
              </div>
            );
          })}
        </div>
        <Button
          disabled={!selectedTickets.length}
          onClick={handleRedirectToCheckout}
          size="lg"
          className="px-10 py-7 text-lg font-bold"
        >
          Checkout
        </Button>
      </div>
    </>
  );
};

export default TicketsSelectedBox;
