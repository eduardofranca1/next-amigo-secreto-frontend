import * as ServerApi from "@/api/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const logged = await ServerApi.pingAdmin();
  if (!logged) return redirect("/admin/login");

  return <div>Dashboard Admin</div>;
};

export default Page;
