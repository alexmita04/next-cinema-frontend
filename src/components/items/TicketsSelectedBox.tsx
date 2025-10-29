import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const ticketsData = [
  { seat: "A", row: "6" },
  { seat: "B", row: "6" },
  { seat: "A", row: "6" },
  { seat: "B", row: "6" },
  { seat: "A", row: "6" },
  { seat: "B", row: "6" },
  { seat: "A", row: "6" },
  { seat: "B", row: "6" },
];

const TicketsSelectedBox = () => {
  return (
    <>
      <div className="border-3 border-black rounded-lg p-10">
        <p className="text-2xl font-medium mb-4">Tickets Selected</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
          {ticketsData.map((ticketEl) => {
            return (
              <div className="flex flex-col items-center border-2 border-black p-4 rounded-lg">
                <p className="text-sm md:text-lg">
                  Ticket <span>{ticketEl.seat + ticketEl.row}</span>
                </p>
                <a href="#" className="text-red-500">
                  delete
                </a>
              </div>
            );
          })}
        </div>
        <Button size="lg" className="px-10 py-7 text-lg font-bold">
          <Link to={"#"}>Checkout</Link>
        </Button>
      </div>
    </>
  );
};

export default TicketsSelectedBox;
