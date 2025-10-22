import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/items/DatePicker";
import SearchSelectInput from "@/components/items/SearchSelectInput";

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
    id: "68ecf08c52e10981ea3f2cda",
  },
  {
    value: "Auditorium 3",
    id: "68ecf08c52e10981ea3f2cfa",
  },
];

const EditScreening = () => {
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="max-w-[450px] w-full flex flex-col gap-5 mt-15">
          <h1 className="text-4xl font-medium">Edit Screening</h1>
          <div className="flex flex-col gap-5">
            <SearchSelectInput dataArr={movies} placeholder="Select Movie..." />
            <SearchSelectInput
              dataArr={auditoriums}
              placeholder="Select Auditorium..."
            />
            <DatePicker />
            <Input
              type="number"
              min="0"
              max="24"
              placeholder="Start Time (hour)"
            />
            <Input type="text" placeholder="Language" />
            <Input type="text" placeholder="Subtitle Language" />
            <div>
              <Button size="lg">Edit Screening</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditScreening;
