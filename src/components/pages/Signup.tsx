import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/items/FormField";

const formSchema = z.object({
  username: z.string().min(1, "Username can't be empty"),
  password: z.string().min(1, "Password can't be empty"),
  address: z.string().min(1, "Address can't be empty"),
  phoneNumber: z.string().min(1, "Phone Number can't be empty"),
  gender: z.string().min(1, "Gender can't be empty"),
  // gender: z.enum(["Male", "Female", "Prefer not to say"]),
});

type FormData = z.infer<typeof formSchema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      address: "",
      phoneNumber: "",
      gender: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("validation passed");
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-15">
        <div className="flex flex-col gap-10 w-full max-w-[450px]">
          <h1 className="text-6xl font-medium">Sign up</h1>
          <form
            className="max-w-[450px]"
            action="#"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              name="username"
              placeholder="username"
              type="text"
              register={register}
              error={errors.username}
            />
            <FormField
              name="password"
              placeholder="password"
              type="password"
              register={register}
              error={errors.password}
            />
            <FormField
              name="address"
              placeholder="address"
              type="text"
              register={register}
              error={errors.address}
            />
            <FormField
              name="phoneNumber"
              placeholder="phone number"
              type="text"
              register={register}
              error={errors.phoneNumber}
            />
            <div className="mb-5">
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={`w-full mb-2 data-[placeholder]:text-gray-500 ${
                        errors.gender ? "data-[placeholder]:text-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Prefer not to say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <div className="text-sm text-red-500 w-full">
                {errors.gender && (
                  <>
                    <p>{errors.gender.message}</p>
                  </>
                )}
              </div>
              <p className="mb-5 text-sm">
                Already having an account?{" "}
                <a className="text-red-500" href="#">
                  Login
                </a>
              </p>
            </div>

            <Button variant="default" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Sign up"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
