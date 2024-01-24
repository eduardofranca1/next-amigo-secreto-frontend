import * as ServerApi from "@/api/server";
import { AdminPage } from "@/components/admin/AdminPage";
import { redirect } from "next/navigation";

// página server side
// mas o componente AdminPage é use client
// por isso tem que ser criado outro componente para ser renderizado
// porque vai precisar de interação com o usuário
const Page = async () => {
  const logged = await ServerApi.pingAdmin();
  if (!logged) return redirect("/admin/login");

  return (
    <div>
      <AdminPage />
    </div>
  );
};

export default Page;
