import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, type, name, ticker, index, amount, price } = (await req.json()) as {
      id: string;
      type: string;
      name: string;
      ticker: string;
      index: string;
      amount: number;
      price: number;
    };

    if(type === "stock") {
      const data = await prisma.stockAsset.findFirst({
        where: {
          AND: [{ name: name}, {portfolioId: id}]
        },
        select: {id: true, amount: true, average: true}
      });

      if (data !== null && data.average > 0.00 && data.amount > 0){
        const ttl_amt = data.amount + amount;
        console.log("Total Amount: ", ttl_amt);
        const average = ((data.average * data.amount) + (price + amount)) / ttl_amt;
        const stock = await prisma.stockAsset.update({
          where: {id: id},
          data: {
            portfolioId: data.id,    
            name,
            ticker,
            index,
            amount: Number(ttl_amt),
            average: Number(average),
          },
        });
        return NextResponse.json(stock);
      } else if (data === null) {
        const stock = await prisma.stockAsset.create({
          data: {
            portfolioId: id,    
            name,
            ticker,
            index,
            amount: Number(amount),
            average: Number(price),
          },
        });
        return NextResponse.json(stock);
      }

    } else if (type === "crypto") {
      const data = await prisma.cryptoAsset.findFirst({
        where: {
          AND: [{ name: name}, {portfolioId: id}]
        },
        select: {id: true, amount: true, average: true}
      });

      if (data !== null && data.average > 0.00 && data.amount > 0){
        const ttl_amt = data.amount + amount;
        const average = ((data.average * data.amount) + (price + amount)) / ttl_amt;
        const crypto = await prisma.cryptoAsset.update({
          where: {id: data.id},
          data: {
            portfolioId: id,    
            name,
            ticker,
            amount: Number(ttl_amt),
            average: Number(average),
          },
        });
        return NextResponse.json(crypto);
      } else if (data === null) {
        const stock = await prisma.cryptoAsset.create({
          data: {
            portfolioId: id,    
            name,
            ticker,
            amount: Number(amount),
            average: Number(price),
          },
        });
        return NextResponse.json(stock);
      }
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if(id === null) return NextResponse.json(JSON.stringify({status: "error", message: "id is null idiot"}), {status: 403})

    const stocks = await prisma.stockAsset.findMany({
      where: { portfolioId: String(id)},
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
      where: { portfolioId: String(id)},
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