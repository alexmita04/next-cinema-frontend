import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface AdminScreeningCardProps {
  screeningId: string;
  movieTitle: string;
}

const AdminScreeningCard = ({
  screeningId,
  movieTitle,
}: AdminScreeningCardProps) => {
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center border-b-2 pb-3">
        <p>
          Screening Id (
          <span className="text-red-500 cursor-pointer">{screeningId}</span>) -{" "}
          {movieTitle}
        </p>
        <div className="flex gap-1 md:gap-5">
          <Button variant="outline">
            <Link to={`/dashboard/screenings/edit-screening/${screeningId}`}>
              Edit
            </Link>
          </Button>
          <Button>Delete</Button>
        </div>
      </div>
    </>
  );
};

export default AdminScreeningCard;
