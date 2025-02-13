import { MainContentWrapper } from "@/components/wrapper/MainContentWrapper";

export default async function Home() {
  return (
    <MainContentWrapper className="absolute" breakpoint={768} />
  );
}
