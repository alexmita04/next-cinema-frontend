import { Input } from "@/components/ui/input";
import {
  type UseFormRegister,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FormFieldInterface<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder: string;
  type: string;
  error: FieldError | undefined;
}

const FormField = <T extends FieldValues>({
  name,
  register,
  placeholder,
  type,
  error,
}: FormFieldInterface<T>) => {
  return (
    <>
      <div className="mb-5">
        <Input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={`mb-2 ${error ? "border-red-500" : ""}`}
        />
        <div className="text-sm text-red-500 w-full">
          {error && (
            <>
              <p>{error.message}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FormField;
