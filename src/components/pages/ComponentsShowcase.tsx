import { Button } from "@/components/ui/button";

const ComponentsShowcase = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl">Components:</h1>
        <div>
          <p className="text-2xl">Buttons:</p>
          <div>
            <Button className="mr-3" variant={"default"}>
              Default
            </Button>
            <Button variant={"outline"}>Outline</Button>
          </div>
          <div className="mt-4">
            <Button className="mr-3" size="lg" variant={"default"}>
              Default
            </Button>
            <Button size={"lg"} variant={"outline"}>
              Outline
            </Button>
          </div>
        </div>
        <div>
          <p className="text-2xl">Link</p>
          <Button size="lg" variant="link">
            <a href="/">Home</a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ComponentsShowcase;
