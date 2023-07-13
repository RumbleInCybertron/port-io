import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams} = new URL(req.url);
    const param = searchParams.get('param');
    if( param === null) return NextResponse.json(JSON.stringify({status: "error", message: "type or param is null"}), {status: 403});
    const stock = await prisma.stock.findFirstOrThrow({
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
