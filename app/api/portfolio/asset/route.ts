import { CryptoAsset } from "@/components/portfolio/Asset";
import { prisma } from "@/lib/prisma";
import { createTransaction } from "@/utils/createTransaction";
import { NextRequest, NextResponse } from "next/server";

async function createAsset(
    portfolioId: string, 
    name: string, 
    ticker: string, 
    index: string,
    amount: number,
    price: number,
    transactionType: string,
    assetType: string,
  ){
  return await prisma.$transaction(async (tx)=>{
    let asset;
    if (assetType === "stock"){
      asset = await tx.stockAsset.create({
        data: {
          portfolioId: portfolioId,    
          name,
          ticker,
          index,
          amount: Number(amount),
          average: Number(price),
        }
      });
    } else if (assetType === "crypto") {
      asset = await tx.cryptoAsset.create({
        data: {
          portfolioId: portfolioId,    
          name,
          ticker,
          amount: Number(amount),
          average: Number(price),
        }
      });
    }
    const transaction = await tx.transaction.create({
      data: {  
        price: transactionType === "long" ? Number(price) : Number(-price),
        units: Number(asset?.amount),
        type: assetType,
        stockAssetId: assetType === "stock" ? asset?.id : null,
        cryptoAssetId: assetType === "crypto" ? asset?.id : null,
      }
    });
    return asset; 
  })
}

export async function PUT(req: Request) {
  try {
    const { id, assetType, transactionType, name, ticker, index, amount, price, portfolioId } = (await req.json()) as {
      id: string;
      assetType: string;
      transactionType: string,
      name: string;
      ticker: string;
      index: string;
      amount: number;
      price: number;
      portfolioId: string;
    };

    if(assetType === "stock") {
      const data = await prisma.stockAsset.findFirst({
        where: {
          AND: [{ name: { equals: String(name)}}, {portfolioId: {equals: String(portfolioId)}}]
        },
        select: {id: true, amount: true, average: true}
      });

      if (data !== null && data.average > 0.00 && data.amount > 0){
        const ttl_amt = data.amount + Number(amount);
        console.log("Total Amount: ", ttl_amt);
        const average = ((data.average * data.amount) + (Number(price) * Number(amount))) / ttl_amt;
        const stock = await prisma.stockAsset.update({
          where: {id: id},
          data: {
            portfolioId,    
            name,
            ticker,
            index,
            amount: ttl_amt,
            average: Number(average),
          },
        });
        await createTransaction(stock, assetType, transactionType, price );
        return NextResponse.json(stock);
      } else if (data === null) {
        const stock = await createAsset(portfolioId, name, ticker, index, amount, price, transactionType, assetType );
        return NextResponse.json(stock);
      }

    } else if (assetType === "crypto") {
      let crypto;
      const data = await prisma.cryptoAsset.findFirst({
        where: {
          AND: [{ name: { equals: String(name)}}, {portfolioId: {equals: String(portfolioId)}}]
        },
        select: {id: true, amount: true, average: true}
      });

      if (data !== null && data.average > 0.00 && data.amount > 0){
        const ttl_amt = data.amount + Number(amount);
        const average = ((data.average * data.amount) + (Number(price) * Number(amount))) / ttl_amt;
        crypto = await prisma.cryptoAsset.update({
          where: {id: data.id},
          data: {
            portfolioId,    
            name,
            ticker,
            amount: ttl_amt,
            average: Number(average),
          },
        });
        await createTransaction(crypto, assetType, transactionType, price );
        return NextResponse.json(crypto);
      } else if (data === null) {
        const crypto = await createAsset(portfolioId, name, ticker, index, amount, price, transactionType, assetType );
        return NextResponse.json(crypto);
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

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get('id');
//     if(id === null) return NextResponse.json(JSON.stringify({status: "error", message: "id is null idiot"}), {status: 403})

//     const stocks = await prisma.stockAsset.findMany({
//       where: { portfolioId: String(id)},
//       select: {
//         name: true,
//         ticker: true,
//         index: true,
//         amount: true,
//         average: true,
//         portfolio: {
//           select: {
//             id: true
//           }
//         },
//       }
//     });

//     const cryptos = await prisma.cryptoAsset.findMany({
//       where: { portfolioId: String(id)},
//       select: {
//         name: true,
//         ticker: true,
//         amount: true,
//         average: true,
//         portfolio: {
//           select: {
//             id: true
//           }
//         },
//       }
//     });

//     // TODO: validate stocks&cryptos against user id
 
//     return NextResponse.json({
//         assets: {
//           stocks,
//           cryptos
//         }
//       });
//   } catch (error: any) {
//     return new NextResponse(
//       JSON.stringify({
//         status: "error",
//         message: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }