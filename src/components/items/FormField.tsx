import { Input } from "@/components/ui/input";
import {
  type UseFormRegister,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import InputError from "@/components/items/InputError";

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
          {...register(name, {
            valueAsNumber: type === "number",
          })}
          type={type}
          placeholder={placeholder}
          className={`mb-2 ${error ? "border-red-500" : ""}`}
        />
        <InputError fieldError={error} />
      </div>
    </>
  );
};

export default FormField;
