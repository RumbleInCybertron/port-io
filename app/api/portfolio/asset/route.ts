import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { portfolioId, type, name, ticker, index, amount, average } = (await req.json()) as {
      portfolioId: string;
      type: string;
      name: string;
      ticker: string;
      index: string;
      amount: number;
      average: number;
    };
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: String(session?.user?.email) },
      select: { id: true },
    });

    if(type === "stock") {
      const stock = await prisma.stockAsset.create({
        data: {
          portfolioId,    
          name,
          ticker,
          index,
          amount,
          average,
        },
      });
      return NextResponse.json(stock);
    } else if (type === "crypto") {
      const crypto = await prisma.cryptoAsset.create({
        data: { 
          portfolioId,    
          name,
          ticker,
          amount,
          average,
        },
      });
      return NextResponse.json(crypto);
    } else {
      // TODO: throw type error
    }
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

export async function GET({params}: {params: {id: string}}) {
  try {
    const id = params.id
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: String(session?.user?.email) },
      select: { id: true },
    }); 

    const stocks = await prisma.stockAsset.findMany({
      where: { portfolioId: id},
      select: {
        name: true,
        ticker: true,
        index: true,
        amount: true,
        average: true,
        portfolio: {
          select: {
            id: true
          }
        },
      }
    });

    const cryptos = await prisma.cryptoAsset.findMany({
      where: { portfolioId: id},
      select: {
        name: true,
        ticker: true,
        amount: true,
        average: true,
        portfolio: {
          select: {
            id: true
          }
        },
      }
    });

    // TODO: validate stocks&cryptos against user id
 
    return NextResponse.json({
        assets: {
          stocks,
          cryptos
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