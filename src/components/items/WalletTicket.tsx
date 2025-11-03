import { type TicketInterface } from "@/lib/backendTypes";

interface WalletTicketProp {
  ticket: TicketInterface;
}

const WalletTicket = ({ ticket }: WalletTicketProp) => {
  return (
    <>
      <div className="border-black border-1 overflow-hidden relative h-[400px] group rounded-xl">
        <img
          src={ticket.screening.movie.coverImage}
          alt="movie cover image"
          className="absolute top-0 left-0 h-full w-full object-cover -z-20"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black/50 -z-10"></div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-red-500/80 to-transparent transition-all duration-300 ease-in-out group-hover:h-full"></div>
        <div className="flex flex-col items-center justify-end h-full gap-2 text-white font-bold p-5 text-center">
          <p className="text-2xl">{ticket.screening.movie.title}</p>
          <p>
            Place: {ticket.seat.row}
            {ticket.seat.number}
          </p>
          <p>
            {ticket.screening.date} - {ticket.screening.startTime}:00
          </p>
        </div>
      </div>
    </>
  );
};

export default WalletTicket;
