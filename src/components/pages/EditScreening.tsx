import { Button } from "@/components/ui/button";
import DatePicker from "@/components/items/DatePicker";
// import SearchSelectInput from "@/components/items/SearchSelectInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/items/FormField";
import InputError from "@/components/items/InputError";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import ApiClient from "@/lib/apiClient";
import CustomSpinner from "@/components/items/CustomSpinner";
import {
  type AuditoriumInterface,
  type MovieInterface,
  isApiError,
} from "@/lib/backendTypes";
import { useState } from "react";
import AlertEl from "@/components/items/AlertEl";

const startOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const formSchema = z.object({
  // movieId: z.string().min(1, "You have to select a movie"),
  // auditoriumId: z.string().min(1, "You have to select an auditorium"),
  date: z.date().min(startOfToday(), "Screening date can't be in the past"),
  startTime: z
    .number()
    .min(0, "You start time should be a number between 0 and 24")
    .max(24, "You start time should be a number between 0 and 24"),
  price: z.number().min(1, "Ticket price must be at least $1"),
  language: z.string().min(1, "Language can't be empty"),
  subtitle: z.string().min(1, "Subtitle can't be empty"),
});

type FormData = z.infer<typeof formSchema>;

type SelectOption = { value: string; id: string };

const fetchMovies = async (): Promise<SelectOption[]> => {
  try {
    const response = await ApiClient.get("/movies");

    const fetchedMovies = response.data.data.movies as MovieInterface[];

    const selectMovies = fetchedMovies.map((movie: MovieInterface) => {
      return {
        value: movie.title,
        id: movie._id,
      };
    });

    return selectMovies;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Something went wrong!");
  }
};

const fetchAuditoriums = async (): Promise<SelectOption[]> => {
  try {
    const response = await ApiClient.get("/users/cinema");

    const fetchedAuditoriums = response.data.data.cinema
      .auditoriums as AuditoriumInterface[];

    const auditoriums = fetchedAuditoriums.map((aud: AuditoriumInterface) => ({
      id: aud._id,
      value: `Auditorium ${aud.number}`,
    }));

    return auditoriums;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Something went wrong!");
  }
};

const fetchCinema = async () => {
  try {
    const response = await ApiClient.get("/users/cinema");

    return response.data.data.cinema;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Something went wrong!");
  }
};

const fetchScreening = async (
  screeningId: string | undefined,
  cinemaId: string | undefined,
  auditoriumId: string | undefined
) => {
  try {
    if (!screeningId || !cinemaId || !auditoriumId) {
      throw new Error("Url is not correct");
    } else {
      const response = await ApiClient.get(
        `/cinemas/${cinemaId}/auditoriums/${auditoriumId}/screenings/${screeningId}`
      );

      return response.data.data.screening;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Something went wrong!");
  }
};

const convertDate = (date: Date) => {
  const localDate = new Date(date);

  const year = localDate.getFullYear();
  const month = localDate.getMonth() + 1;
  const day = localDate.getDate();

  const pad = (num: number) => String(num).padStart(2, "0");

  const formattedDate = `${year}-${pad(month)}-${pad(day)}`;

  return formattedDate;
};

const editScreeningMutation = async ({
  screeningId,
  cinemaId,
  auditoriumId,
  screening,
}: {
  screeningId: string;
  cinemaId: string;
  auditoriumId: string;
  screening: {
    // movieId: string;
    // auditoriumId: string;
    date: Date;
    startTime: number;
    price: number;
    language: string;
    subtitle: string;
  };
}) => {
  try {
    await ApiClient.put(
      `/cinemas/${cinemaId}/auditoriums/${auditoriumId}/screenings/${screeningId}`,
      { ...screening, date: convertDate(screening.date) }
    );
  } catch (err: unknown) {
    if (isApiError(err)) throw new Error(err.response.data.message);

    throw new Error("Something went wrong try later!");
  }
};

const EditScreening = () => {
  const [fetchFormInformation, setFetchFormInformation] =
    useState<boolean>(false);

  const { screeningId, auditoriumId, cinemaId } = useParams();

  const navigate = useNavigate();

  const {
    data: movies,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
  } = useQuery<{ value: string; id: string }[]>({
    queryKey: ["selectMovies"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: auditoriums,
    isLoading: isLoadingAuditoriums,
    isError: isErrorAuditoriums,
  } = useQuery({
    queryKey: ["selectAuditoriums"],
    queryFn: fetchAuditoriums,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: cinema,
    isLoading: isLoadingCinema,
    isError: isErrorCinema,
  } = useQuery({
    queryKey: ["selectCinema"],
    queryFn: fetchCinema,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: screening,
    isLoading: isLoadingScreening,
    isError: isErrorScreening,
  } = useQuery({
    queryKey: ["editScreening"],
    queryFn: fetchScreening.bind(null, screeningId, cinemaId, auditoriumId),
    staleTime: 1000 * 60 * 5,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // movieId: "",
      // auditoriumId: "",
      date: new Date(Date.now()),
      startTime: undefined,
      price: undefined,
      language: "",
      subtitle: "",
    },
  });

  const mutation = useMutation({
    mutationFn: editScreeningMutation,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = (data: FormData) => {
    if (screeningId && cinemaId && auditoriumId) {
      mutation.mutate({
        screeningId,
        cinemaId,
        auditoriumId,
        screening: data,
      });
    }
  };

  if (
    isErrorAuditoriums ||
    isErrorCinema ||
    isErrorMovies ||
    isErrorScreening
  ) {
    navigate("/dashboard");
  }

  if (
    isLoadingAuditoriums ||
    isLoadingMovies ||
    isLoadingCinema ||
    isLoadingScreening
  )
    return <CustomSpinner size={6} />;

  if (
    screening &&
    movies &&
    cinema &&
    auditoriums &&
    fetchFormInformation === false
  ) {
    setFetchFormInformation(true);

    reset({
      // movieId: screening.movie._id,
      // auditoriumId: screening.auditorium._id,
      date: new Date(screening.date),
      startTime: screening.startTime,
      price: screening.pricing,
      language: screening.language,
      subtitle: screening.subtitle,
    });
  }

  return (
    <>
      <div className="flex justify-center w-full">
        <form
          className="max-w-[450px] w-full flex flex-col gap-5 mt-15"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          {mutation.error && (
            <AlertEl variant="destructive" title={mutation.error.message} />
          )}
          <h1 className="text-4xl font-medium">Edit Screening</h1>
          {isLoadingMovies ||
          isLoadingAuditoriums ||
          isLoadingCinema ||
          isLoadingScreening ||
          !movies ||
          !auditoriums ||
          !cinema ||
          !screening ? (
            <CustomSpinner size={6} />
          ) : (
            <>
              <div className="flex flex-col">
                {/* <div className="mb-5">
                  <Label htmlFor="movie" className="mb-1 text-md">
                    Movie
                  </Label>
                  <Controller
                    control={control}
                    // defaultValue={screening.movie._id}
                    name="movieId"
                    render={({ field }) => (
                      <SearchSelectInput
                        dataArr={movies}
                        placeholder="Select Movie..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <InputError fieldError={errors.movieId} />
                </div> */}
                {/* <div className="mb-5">
                  <Label htmlFor="auditorium" className="mb-1 text-md">
                    Auditorium
                  </Label>
                  <Controller
                    control={control}
                    name="auditoriumId"
                    render={({ field }) => (
                      <SearchSelectInput
                        dataArr={auditoriums}
                        placeholder="Select Auditorium..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <InputError fieldError={errors.auditoriumId} />
                </div> */}

                <div className="mb-5">
                  <Label htmlFor="date" className="mb-1 text-md">
                    Date
                  </Label>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <InputError fieldError={errors.date} />
                </div>

                <FormField
                  name="startTime"
                  type="number"
                  placeholder="start time"
                  register={register}
                  error={errors.startTime}
                />
                <FormField
                  name="price"
                  type="number"
                  placeholder="price"
                  register={register}
                  error={errors.price}
                />
                <FormField
                  name="language"
                  type="text"
                  placeholder="language"
                  register={register}
                  error={errors.language}
                />
                <FormField
                  name="subtitle"
                  type="text"
                  placeholder="subtitle"
                  register={register}
                  error={errors.subtitle}
                />
                <div>
                  <Button size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Edit Screening"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default EditScreening;
