import { projectController } from "@/db";
import { getUserFromServerSession } from "@/lib/auth";
import { IProjectFormValues, INextRouteParams } from "@/lib/interfaces";
import { validateIdParam } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: INextRouteParams) {
  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });

  const user = await getUserFromServerSession();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, color }: IProjectFormValues = await req.json();

  if (!projectController.validate({ name, color }))
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });

  try {
    const updatedProject = await projectController.update(user.id, {
      id: Number(params.id),
      name,
      color,
    });

    if (!updatedProject) throw new Error("Failed to update project");

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: INextRouteParams) {
  if (!validateIdParam(params.id))
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });

  const user = await getUserFromServerSession();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const deletedProject = await projectController.delete(
      user.id,
      Number(params.id)
    );

    if (!deletedProject) throw new Error("Failed to delete project");

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
