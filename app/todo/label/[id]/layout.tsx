import LabelProvider from "@/components/providers/LabelProvider";
import { getUserFromServerSession } from "@/lib/auth";
import { NextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";
import { redirect, notFound } from "next/navigation";

interface Props extends NextRouteParams {
  children: React.ReactNode;
}

const LabelLayout = async ({ children, params }: Props) => {
  if (!params?.id || !isUUID(params?.id)) return notFound();

  const user = await getUserFromServerSession();

  if (!user) return redirect("/");

  const label = await (
    await import("@/db/LabelController")
  ).default.get(user.id, params.id);
  
  console.log(label);

  return <LabelProvider>{children}</LabelProvider>;
};
export default LabelLayout;
