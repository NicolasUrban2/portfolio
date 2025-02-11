import { MainContentWrapper } from "@/components/wrapper/MainContentWrapper";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.from('portfolio_contents').select('*');

  const contents: {
    [locale: string]: {
      [code: string]: string,
    },
  } = {};

  if (data) {
    data.forEach((content) => {
      if (!contents[content.locale]) {
        contents[content.locale] = {};
      }
      contents[content.locale][content.code] = content.content ?? '';
    });
  }

  return (
    <MainContentWrapper className="absolute" breakpoint={768} contents={contents} />
  );
}
