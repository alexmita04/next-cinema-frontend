import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { isApiError } from "@/lib/backendTypes";
import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/lib/apiClient";
import { type FetchedScreeningInterface } from "@/components/pages/AdminDashboard";

interface AdminScreeningCardProps {
  screeningId: string;
  movieTitle: string;
  auditoriumId: string;
  cinemaId: string;
  setScreenings: React.Dispatch<
    React.SetStateAction<FetchedScreeningInterface[] | null>
  >;
}

const deleteScreening = async (
  screeningId: string,
  cinemaId: string,
  auditoriumId: string
) => {
  try {
    await ApiClient.delete(
      `/cinemas/${cinemaId}/auditoriums/${auditoriumId}/screenings/${screeningId}`
    );
  } catch (err: unknown) {
    if (isApiError(err)) throw new Error(err.response.data.message);

    throw new Error("Something went wrong try later!");
  }
};

const AdminScreeningCard = ({
  screeningId,
  movieTitle,
  auditoriumId,
  cinemaId,
  setScreenings,
}: AdminScreeningCardProps) => {
  const mutation = useMutation({
    mutationFn: deleteScreening.bind(null, screeningId, cinemaId, auditoriumId),
    onSuccess: () => {
      setScreenings((screenings) => {
        if (screenings)
          return screenings?.filter(
            (screeningEl) => screeningEl._id !== screeningId
          );

        return null;
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onDeleteHandler = () => {
    mutation.mutate();
  };

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
          <Button onClick={onDeleteHandler}>Delete</Button>
        </div>
      </div>
    </>
  );
};

export default AdminScreeningCard;
