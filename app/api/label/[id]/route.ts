import { labelController } from "@/db";
import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { ILabelFormValues, INextRouteParams } from "@/lib/interfaces";

export async function PUT(req: NextRequest, { params }: INextRouteParams) {
  if (!params.id || !isUUID(params.id))
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });

  const user = await getUserFromServerSession();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name }: ILabelFormValues = await req.json();

  if (!labelController.validate({ name }))
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });

  try {
    const updatedLabel = await labelController.update(user.id, {
      id: params.id,
      name,
    });

    if (!updatedLabel) throw new Error("Failed to update label");

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
  if (!params.id || !isUUID(params.id))
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });

  const user = await getUserFromServerSession();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const deletedLabel = await labelController.delete(user.id, params.id);

    if (!deletedLabel)
      return NextResponse.json({ error: "Label not found." }, { status: 404 });

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
