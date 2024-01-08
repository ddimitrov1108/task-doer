import { labelController } from "@/db";
import { getUserFromServerSession } from "@/lib/auth";
import { ILabelFormValues, IUserData } from "@/lib/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user: IUserData | null = await getUserFromServerSession();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const labels = await labelController.getList(user.id);
    return NextResponse.json(labels, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromServerSession();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name }: ILabelFormValues = await req.json();

  if (!labelController.validate({ name }))
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });

  try {
    const doesLabelExist = await labelController.exists(user.id, name);

    if (doesLabelExist)
      return NextResponse.json(
        { error: "The label already exists! Please try another name" },
        { status: 400 }
      );

    const newLabel = await labelController.create(user.id, {
      name,
    });

    if (!newLabel) throw new Error("Failed to create label");

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
