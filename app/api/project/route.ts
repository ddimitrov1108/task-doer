import { projectController } from "@/db";
import { authConfig } from "@/lib/auth";
import { IUserSession } from "@/lib/interfaces";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface IRequestBodyValues {
  name: string;
  color: string;
}

export async function POST(req: NextRequest) {
  const session: IUserSession | null = await getServerSession(authConfig);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, color }: IRequestBodyValues = await req.json();

  if (!projectController.validate({ name, color }))
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  try {
    const newProject = await projectController.create({
      name,
      color,
      uid: parseInt(session.user.id),
    });

    if (!newProject) throw new Error("Failed to create project.");

    return NextResponse.json(
      { href: `/todo/project/${newProject.id}` },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
