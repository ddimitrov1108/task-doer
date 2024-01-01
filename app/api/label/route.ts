// import { authConfig } from "@/lib/auth";
// import { IUserSession } from "@/lib/interfaces";
// import prisma from "@/lib/prisma";
// import { validateLabelValues } from "@/lib/utils";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}

// export async function POST(req: NextRequest) {
//   const session: IUserSession | null = await getServerSession(authConfig);

//   if (!session || !session.user || !session.user.id)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { name } = await req.json();

//   if (!validateLabelValues(name))
//     return NextResponse.json({ error: "Invalid fields." }, { status: 400 });

//   const formattedName = name.toLowerCase().replace(/\s+/g, "-");

//   try {
//     const isDuplicate = await isLabelDuplucated(session.user.id, formattedName);

//     if (isDuplicate) {
//       return NextResponse.json(
//         { error: "The label already exists! Please try another name." },
//         { status: 409 }
//       );
//     }

//     await prisma.label.create({
//       data: {
//         uid: session.user.id,
//         name: formattedName,
//       },
//     });

//     return NextResponse.json({}, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Something went wrong. Please try again later." },
//       { status: 500 }
//     );
//   }
// }
