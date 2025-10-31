// import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertElInterface {
  variant: "default" | "destructive" | undefined | null;
  title: string;
  message?: string;
}

const AlertEl = ({ variant = "default", title, message }: AlertElInterface) => {
  return (
    <>
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert variant={variant}>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </div>
    </>
  );
};

export default AlertEl;
