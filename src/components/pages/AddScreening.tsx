import { Button } from "@/components/ui/button";
import DatePicker from "@/components/items/DatePicker";
import SearchSelectInput from "@/components/items/SearchSelectInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/items/FormField";
import InputError from "@/components/items/InputError";
import { Label } from "@/components/ui/label";
import ApiClient from "@/lib/apiClient";
import CustomSpinner from "@/components/items/CustomSpinner";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  type MovieInterface,
  type AuditoriumInterface,
  type CinemaInterface,
} from "@/lib/backendTypes";
import AlertEl from "@/components/items/AlertEl";

const startOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const formSchema = z.object({
  movieId: z.string().min(1, "You have to select a movie"),
  auditorium: z.string().min(1, "You have to select an auditorium"),
  date: z.date().min(startOfToday(), "Screening date can't be in the past"),
  startTime: z
    .number()
    .min(0, "You start time should be a number between 0 and 24")
    .max(24, "You start time should be a number between 0 and 24"),
  pricing: z.number().min(1, "Ticket price must be at least $1"),
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

const convertDate = (date: Date) => {
  const localDate = new Date(date);

  const year = localDate.getUTCFullYear();
  const month = localDate.getUTCMonth() + 1;
  const day = localDate.getUTCDate();

  const pad = (num: number) => String(num).padStart(2, "0");

  const formattedDate = `${year}-${pad(month)}-${pad(day)}`;

  return formattedDate;
};

interface ApiError {
  response: {
    data: {
      message: string;
    };
    // Alte proprietăți axios: status, headers, config, etc.
  };
}

function isApiError(err: unknown): err is ApiError {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as ApiError).response === "object" &&
    (err as ApiError).response !== null &&
    "data" in (err as ApiError).response &&
    typeof (err as ApiError).response.data === "object" &&
    (err as ApiError).response.data !== null &&
    "message" in (err as ApiError).response.data &&
    typeof (err as ApiError).response.data.message === "string"
  );
}

const createScreening = async (postData: {
  screening: {
    movieId: string;
    auditorium: string;
    date: Date;
    startTime: number;
    pricing: number;
    language: string;
    subtitle: string;
  };
  cinema: CinemaInterface;
}) => {
  try {
    const { auditorium, ...screeningData } = postData.screening;

    await ApiClient.post(
      `/cinemas/${postData.cinema._id}/auditoriums/${auditorium}/screenings`,
      { ...screeningData, date: convertDate(screeningData.date) }
    );
  } catch (err: unknown) {
    if (isApiError(err)) throw new Error(err.response.data.message);

    throw new Error("Something went wrong!");
  }
};

const AddScreening = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movieId: "",
      auditorium: "",
      date: new Date(Date.now()),
      startTime: undefined,
      pricing: undefined,
      language: "",
      subtitle: "",
    },
  });

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

  const mutation = useMutation({
    mutationFn: createScreening,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("validation passed");
    // console.log(data);
    mutation.mutate({ cinema, screening: data });
  };

  if (isErrorMovies || isErrorAuditoriums || isErrorCinema)
    navigate("/dashboard");

  return (
    <>
      <div className="flex justify-center w-full">
        <form
          action="#"
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[450px] w-full flex flex-col gap-5 mt-15"
        >
          {mutation.error && (
            <AlertEl variant="destructive" title={mutation.error.message} />
          )}
          <h1 className="text-4xl font-medium">Add Screening</h1>
          {isLoadingMovies ||
          isLoadingAuditoriums ||
          isLoadingCinema ||
          !cinema ||
          !movies ||
          !auditoriums ? (
            <CustomSpinner size={6} />
          ) : (
            <>
              <div className="flex flex-col">
                <div className="mb-5">
                  <Label htmlFor="movie" className="mb-1 text-md">
                    Movie
                  </Label>
                  <Controller
                    control={control}
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
                </div>
                <div className="mb-5">
                  <Label htmlFor="auditorium" className="mb-1 text-md">
                    Auditorium
                  </Label>
                  <Controller
                    control={control}
                    name="auditorium"
                    render={({ field }) => (
                      <SearchSelectInput
                        dataArr={auditoriums}
                        placeholder="Select Auditorium..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <InputError fieldError={errors.auditorium} />
                </div>

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
                  name="pricing"
                  type="number"
                  placeholder="price"
                  register={register}
                  error={errors.pricing}
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
                  <Button
                    size="lg"
                    disabled={isSubmitting || mutation.isPending}
                  >
                    {isSubmitting ? "Submitting..." : "Add Screening"}
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

export default AddScreening;
