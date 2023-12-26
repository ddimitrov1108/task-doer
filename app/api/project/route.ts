import { createProject } from "@/db/project";
import { authConfig } from "@/lib/auth";
import { IProject, IUserSession } from "@/lib/interfaces";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session: IUserSession | null = await getServerSession(authConfig);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, color }: IProject = await req.json();

  try {
    const newProject = await createProject(Number(session.user.id), {
      name,
      color,
    });

    if (!newProject) throw Error("Failed to create project.");

    return NextResponse.json(
      { href: `/todo/projects/${newProject.id}` },
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
