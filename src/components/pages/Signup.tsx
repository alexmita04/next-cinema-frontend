import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import InputError from "@/components/items/InputError";
import { useAuth } from "@/components/auth/AuthContext";
import { useMutation } from "@tanstack/react-query";
import AlertEl from "@/components/items/AlertEl";
import { useNavigate } from "react-router";

const formSchema = z.object({
  username: z.string().min(1, "Username can't be empty"),
  password: z.string().min(1, "Password can't be empty"),
  address: z.string().min(1, "Address can't be empty"),
  phoneNumber: z.string().min(1, "Phone Number can't be empty"),
  gender: z.string().min(1, "Gender can't be empty"),
});

type FormData = z.infer<typeof formSchema>;

const Signup = () => {
  const [error, setError] = useState<{ title: string } | null>(null);
  const { signup, loading } = useAuth();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data: boolean | { status: string; message: string }) => {
      if (
        typeof data === "object" &&
        data !== null &&
        "status" in data &&
        data.status === "error"
      ) {
        setError({ title: data.message });
      } else {
        navigate("/cinemas");
      }
    },
    onError: (err: { message: string }) => {
      setError({ title: err.message });
    },
  });

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
    mutation.mutate({ ...data });
  };

  return (
    <>
      <div className="flex flex-col items-center mt-15">
        <div className="flex flex-col gap-10 w-full max-w-[450px]">
          {error && <AlertEl variant="destructive" title={error.title} />}
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
              <Label htmlFor="gender-select" className="mb-1 text-md">
                Gender
              </Label>
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
              <InputError fieldError={errors.gender} />
              <p className="mb-5 text-sm">
                Already having an account?{" "}
                <a className="text-red-500" href="#">
                  Login
                </a>
              </p>
            </div>

            <Button variant="default" size="lg" disabled={isSubmitting}>
              {isSubmitting || loading ? "Submitting..." : "Sign up"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
