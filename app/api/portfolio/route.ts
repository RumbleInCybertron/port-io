import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name } = (await req.json()) as {
      name: string;
    };
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: String(session?.user?.email) },
      select: { id: true },
    });

    const portfolio = await prisma.portfolio.create({
      data: { 
        userId: user.id, 
        name: name,
      },
    });

    return NextResponse.json({
      portfolio: {
        name: portfolio.name,
      }
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}