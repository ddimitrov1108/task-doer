import { projectController } from "@/db";
import { getUserFromServerSession } from "@/lib/auth";
import { IProjectFormValues } from "@/lib/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromServerSession();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, color }: IProjectFormValues = await req.json();

  if (!projectController.validate({ name, color }))
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });

  try {
    const newProject = await projectController.create(user.id, {
      name,
      color,
    });

    if (!newProject) throw new Error("Failed to create project");

    return NextResponse.json(
      { href: `/todo/project/${newProject.id}` },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
