import { updateProject } from "@/db/project";
import { authConfig } from "@/lib/auth";
import { IApiRouteIdSlug, IProject, IUserSession } from "@/lib/interfaces";
import { validateIdParam } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: IApiRouteIdSlug) {
  const session: IUserSession | null = await getServerSession(authConfig);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!params || !params.id) return null;

  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const { name, color }: IProject = await req.json();
  const projectId = parseInt(params.id);

  try {
    const updatedProject = await updateProject(
      Number(session.user.id),
      projectId,
      { name, color }
    );

    if (!updatedProject)
      return NextResponse.json(
        { error: "Project not found or user does not have access." },
        { status: 404 }
      );

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
