import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-15">
        <div className="flex flex-col gap-10">
          <h1 className="text-6xl font-medium">Login</h1>
          <div className="max-w-[450px]">
            <Input type="text" placeholder="username" className="mb-5" />
            <Input type="password" placeholder="password" className="mb-5" />
            <p className="mb-5 text-sm">
              Not having an account?{" "}
              <a className="text-red-500" href="#">
                Sign up
              </a>
            </p>
            <Button variant="default" size="lg">
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
