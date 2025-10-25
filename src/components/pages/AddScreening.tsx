import { Button } from "@/components/ui/button";
import DatePicker from "@/components/items/DatePicker";
import SearchSelectInput from "@/components/items/SearchSelectInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/items/FormField";
import InputError from "@/components/items/InputError";
import { Label } from "@/components/ui/label";

const movies = [
  {
    value: "Jurassic Park",
    id: "68ecf08c52e10981ea3f2cd3",
  },
  {
    value: "The Prestige",
    id: "68ecf08c52e10981ea3f2cdf",
  },
  {
    value: "Schindler's List",
    id: "68ecf08c52e10981ea3f2cf3",
  },
];

const auditoriums = [
  {
    value: "Auditorium 1",
    id: "68ecf08c52e10981ea3f2cda",
  },
  {
    value: "Auditorium 2",
    id: "68ecf08c52e10981ea3f2cdb",
  },
  {
    value: "Auditorium 3",
    id: "68ecf08c52e10981ea3f2cfa",
  },
];

const startOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const formSchema = z.object({
  movieId: z.string().min(1, "You have to select a movie"),
  auditoriumId: z.string().min(1, "You have to select an auditorium"),
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

const AddScreening = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movieId: "",
      auditoriumId: "",
      date: new Date(Date.now()),
      startTime: undefined,
      price: undefined,
      language: "",
      subtitle: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("validation passed");
    console.log(data);
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <form
          action="#"
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[450px] w-full flex flex-col gap-5 mt-15"
        >
          <h1 className="text-4xl font-medium">Add Screening</h1>
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
            </div>

            <div className="mb-5">
              <Label htmlFor="date" className="mb-1 text-md">
                Date
              </Label>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
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
                {isSubmitting ? "Submitting..." : "Add Screening"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddScreening;
