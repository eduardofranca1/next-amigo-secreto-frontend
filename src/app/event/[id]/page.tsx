import * as EventApi from "@/api/site";
import { Search } from "@/components/site/Search";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

// componente SSR (server side redering)
// só é aceito um componente async que se ele for do lado do servidor
const Page = async ({ params }: Props) => {
  const eventItem = await EventApi.getEvent(parseInt(params.id));
  if (!eventItem || !eventItem.status) return redirect("/");

  return (
    <main className="text-center mx-auto max-w-lg p-5">
      <header>
        <h2 className="text-2xl text-yellow-400">AMIGO SECRETO</h2>
        <h1 className="text-3xl mt-5 mb-2">{eventItem.title}</h1>
        <p className="text-sm mb-5">{eventItem.description}</p>
      </header>
      <Search id={eventItem.id} />
      <footer className="mt-5 text-sm">Criado pela B7WEB</footer>
    </main>
  );
};

export default Page;
