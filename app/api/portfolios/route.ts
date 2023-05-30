import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: String(session?.user?.email) },
      select: { id: true },
    }); 

    const portfolios = await prisma.portfolio.findMany({
      where: { userId: user!.id},
      // select: {
      //   id: true,
      //   name: true,
      //   stockAssets: { select: { name: true, amount: true, average: true, id: true } },
      //   cryptoAssets: { select: { name: true, amount: true, id: true } }
      // }
    });

    return NextResponse.json({
      portfolios
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