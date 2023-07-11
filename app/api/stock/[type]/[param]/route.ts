import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams} = new URL(req.url);
    const type = searchParams.get('type');
    const param = searchParams.get('param');
    if( type === null || param === null) return NextResponse.json(JSON.stringify({status: "error", message: "type or param is null"}), {status: 403});
    let stock: any;
    if (type === "name")
      stock = await prisma.stock.findFirst({
        where: { name: param },
      });
    else if (type === "ticker")
      stock = await prisma.stock.findFirst({
        where: { ticker: param },
      });

    return NextResponse.json({
      ticker: stock.ticker
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
