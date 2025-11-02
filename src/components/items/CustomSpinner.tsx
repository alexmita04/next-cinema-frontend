import { Spinner } from "@/components/ui/spinner";

interface CustomSpinnerInterface {
  size: number;
}

const CustomSpinner = ({ size }: CustomSpinnerInterface) => {
  return (
    <>
      <Spinner className={`size-${size}`} />
    </>
  );
};

export default CustomSpinner;
