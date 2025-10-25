import { type FieldError } from "react-hook-form";

const InputError = ({ fieldError }: { fieldError: FieldError | undefined }) => {
  return (
    <>
      <div className="text-sm text-red-500 w-full">
        {fieldError && (
          <>
            <p>{fieldError.message}</p>
          </>
        )}
      </div>
    </>
  );
};

export default InputError;
