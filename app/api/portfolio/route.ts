import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function create(userId: string, name: string, fiat: number) {
  return await prisma.$transaction(async (tx) => {
    const portfolio = await tx.portfolio.create({
      data: {
        userId: userId,
        name: name,
        ttl_value: fiat !== null ? Number(fiat) : 0,
      },
    });

    await tx.fiat.create({
      data: {
        amount: fiat !== null ? Number(fiat) : 0,
        portfolioId: portfolio.id,
      },
    });
    return portfolio;
  });
}

export async function POST(req: Request) {
  try {
    const { name, fiat } = (await req.json()) as {
      name: string;
      fiat: number;
    };
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: String(session?.user?.email) },
      select: { id: true },
    });

    const portfolio = await create(user.id, name, fiat);

    // TODO: if response not needed, remove
    return NextResponse.json({
      portfolio: {
        name: portfolio.name,
        ttl_value: portfolio.ttl_value,
      },
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
