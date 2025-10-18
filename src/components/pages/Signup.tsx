import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Signup = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-15">
        <div className="flex flex-col gap-10">
          <h1 className="text-6xl font-medium">Sign up</h1>
          <div className="max-w-[450px]">
            <Input type="text" placeholder="username" className="mb-5" />
            <Input type="password" placeholder="password" className="mb-5" />
            <Input type="text" placeholder="address" className="mb-5" />
            <Input type="text" placeholder="phone number" className="mb-5" />
            <Select>
              <SelectTrigger className="w-full mb-5">
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
            <Button variant="default" size="lg">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
