import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/items/FormField";
import { useAuth } from "@/components/auth/AuthContext";

const formSchema = z.object({
  username: z.string().min(1, "Username can't be empty"),
  password: z.string().min(1, "Password can't be empty"),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [error, setError] = useState<null | { title: string }>(null);
  const { login, setAccessToken, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
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
          <h1 className="text-6xl font-medium">Login</h1>
          <form
            className="max-w-[450px] w-full"
            action="#"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              name="username"
              register={register}
              placeholder="username"
              type="text"
              error={errors.username}
            />
            <FormField
              name="password"
              register={register}
              placeholder="password"
              type="password"
              error={errors.password}
            />
            <p className="mb-5 text-sm">
              Not having an account?{" "}
              <a className="text-red-500" href="#">
                Sign up
              </a>
            </p>
            <Button variant="default" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
