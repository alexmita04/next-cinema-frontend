import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <>
      <div className="mt-56 flex flex-col items-center gap-5">
        <h1 className="text-5xl md:text-7xl xl:text-9xl font-bold">
          Next Cinema
        </h1>
        <Button
          variant="default"
          size="lg"
          className="xl:text-2xl xl:px-[40px] xl:py-[30px]"
        >
          <a href="#">Get a Ticket</a>
        </Button>
      </div>
    </>
  );
};

export default LandingPage;
