"use server";

import { getUserFromServerSession } from "@/lib/auth";

export default async function getLabels() {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  try {
    const labels = await (
      await import("@/db/LabelController")
    ).default.getList(user.id);

    return {
      labels,
      error: ""
    }
  } catch (e) {
    console.error(e);
    return { labels:[], error: "Something went wrong. Please try again later" };
  }
}
