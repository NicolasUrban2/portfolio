import { MainDescription } from "@/components/text/MainDescription";

export default async function Home() {

  return (
    <div className="pt-20">
      <h1 className="w-fit mx-auto">
        Hello there
      </h1>
      <MainDescription className="mt-10" />
    </div>
  );
}
