import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/items/FormField";
import { useAuth } from "@/components/auth/AuthContext";
import AlertEl from "@/components/items/AlertEl";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router";

const formSchema = z.object({
  username: z.string().min(1, "Username can't be empty"),
  password: z.string().min(1, "Password can't be empty"),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [error, setError] = useState<null | { title: string }>(null);
  const { login, loading } = useAuth();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
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
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
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
              <Link className="text-red-500" to="/signup">
                Sign up
              </Link>
            </p>
            <Button variant="default" size="lg" disabled={isSubmitting}>
              {isSubmitting || loading ? "Submitting..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
