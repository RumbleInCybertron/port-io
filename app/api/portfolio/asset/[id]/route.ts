import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET({ params }:{ params:{id:string} }) {
  try {
    const id = params.id
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: String(session?.user?.email) },
      select: { id: true },
    }); 

    const portfolio = await prisma.portfolio.findUniqueOrThrow({
      where: { id: id},
      select: {
        userId: true,
        name: true,
        stockAssets: { select: { name: true, amount: true, average: true, id: true } },
        cryptoAssets: { select: { name: true, amount: true, id: true } }
      }
    });

    if (user.id !== portfolio.userId) {
      let err_res = {
        status: "fail",
        message: "No Feedback with the Provided ID Found",
      };

      return new NextResponse(JSON.stringify(err_res), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    return NextResponse.json({
        portfolio: {
          id: id, 
          name: portfolio.name, 
          stockAssets: portfolio.stockAssets, 
          cryptoAssets: portfolio.cryptoAssets
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