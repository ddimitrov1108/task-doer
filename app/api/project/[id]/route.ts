import { authConfig } from "@/lib/auth";
import { IUserSession } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { validateIdParam, validateProjectValues } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session: IUserSession | null = await getServerSession(authConfig);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  const { name, color } = await req.json();

  if (!validateProjectValues({ name, color }))
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  const projectId = parseInt(params.id);

  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
        uid: session.user.id,
      },
      data: {
        name,
        color,
      },
    });

    if (!updatedProject) throw Error("Failed to update project");

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session: IUserSession | null = await getServerSession(authConfig);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request." }, { status: 400 });

  try {
  } catch (e) {}
}
