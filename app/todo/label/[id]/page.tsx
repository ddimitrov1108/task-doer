import { getUserFromServerSession } from "@/lib/auth";
import { NextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";

const LabelPage = async ({ params }: NextRouteParams) => {
  if (!params?.id || !isUUID(params?.id))
    return (await import("next/navigation")).notFound();

  const user = await getUserFromServerSession();

  if (!user) return (await import("next/navigation")).redirect("/");

  const label = await (
    await import("@/db/LabelController")
  ).default.get(user.id, params.id);

  return <div>{params?.id}</div>;
};
export default LabelPage;
