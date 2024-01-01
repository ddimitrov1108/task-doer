import { projectController } from "@/db";
import { authConfig } from "@/lib/auth";
import { IUserSession } from "@/lib/interfaces";
import { validateIdParam } from "@/lib/utils";
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

  if (!projectController.validate({ name, color }))
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

  try {
    const updatedProject = await projectController.update({
      id: parseInt(params.id),
      uid: parseInt(session.user.id),
      name,
      color,
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
    const deletedProject = await projectController.delete(
      parseInt(session.user.id),
      parseInt(params.id)
    );

    if (!deletedProject) throw Error("Failed to delete project");

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
