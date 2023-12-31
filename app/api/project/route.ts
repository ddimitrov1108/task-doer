import { authConfig } from "@/lib/auth";
import { INewProject, IUserSession } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { validateProjectValues } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session: IUserSession | null = await getServerSession(authConfig);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, color }: INewProject = await req.json();

  if (!validateProjectValues({ name, color }))
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        color,
        uid: session.user.id,
      },
    });

    if (!newProject) throw Error("Failed to create project.");

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
