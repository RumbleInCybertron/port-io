import { CryptoAsset } from "@/components/portfolio/Asset";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function createAsset(
  portfolioId: string,
  name: string,
  ticker: string,
  index: string,
  amount: number,
  price: number,
  transactionType: string,
  assetType: string
) {
  return await prisma.$transaction(async (tx) => {
    let asset;
    if (assetType === "stock") {
      asset = await tx.stockAsset.create({
        data: {
          portfolioId: portfolioId,
          name,
          ticker,
          index,
          amount: Number(amount),
          average: Number(price),
        },
      });
    } else if (assetType === "crypto") {
      asset = await tx.cryptoAsset.create({
        data: {
          portfolioId: portfolioId,
          name,
          ticker,
          amount: Number(amount),
          average: Number(price),
        },
      });
    }
    await tx.transaction.create({
      data: {
        price: transactionType === "long" ? Number(price) : Number(-price),
        units: Number(asset?.amount),
        type: assetType,
        stockAssetId: assetType === "stock" ? asset?.id : null,
        cryptoAssetId: assetType === "crypto" ? asset?.id : null,
      },
    });
    await tx.fiat.create({
      data: {
        amount: 0,
        portfolioId: String(portfolioId),
      },
    });
    return asset;
  });
}

async function updateAsset(
  id: string,
  portfolioId: string,
  amount: number,
  ttl_amt: number,
  price: number,
  profit: number | null,
  average: number,
  transactionType: string,
  assetType: string
) {
  return await prisma.$transaction(async (tx) => {
    let pl;
    let asset;
    if (assetType === "stock") {
      asset = await tx.stockAsset.update({
        where: { id: id },
        data: {
          portfolioId: portfolioId,
          amount: Number(ttl_amt),
          average: Number(average),
        },
      });
      if (profit !== null) {
        profit >= 0
          ? (pl = await tx.profit.create({
              data: {
                amount: profit,
                stockAssetId: id,
              },
            }))
          : await tx.loss.create({
              data: {
                amount: profit,
                stockAssetId: id,
              },
            });
      }
      console.log("Asset from update method: ", asset);
    } else if (assetType === "crypto") {
      asset = await tx.cryptoAsset.update({
        where: { id: id },
        data: {
          portfolioId: portfolioId,
          amount: Number(ttl_amt),
          average: Number(average),
        },
      });
      if (profit !== null) {
        profit >= 0
          ? (pl = await tx.profit.create({
              data: {
                amount: profit,
                cryptoAssetId: id,
              },
            }))
          : await tx.loss.create({
              data: {
                amount: profit,
                cryptoAssetId: id,
              },
            });
      }
    }
    console.log("ID passed to update function: ", id);
    const transaction = await tx.transaction.create({
      data: {
        price: transactionType === "long" ? Number(price) : Number(-price),
        units: Number(amount),
        type: assetType,
        stockAssetId: assetType === "stock" ? String(id) : null,
        cryptoAssetId: assetType === "crypto" ? String(id) : null,
      },
    });
    console.log("Transaction from update method: ", transaction);
    return asset;
  });
}

export async function PUT(req: Request) {
  try {
    const {
      assetType,
      transactionType,
      name,
      ticker,
      index,
      amount,
      price,
      portfolioId,
    } = (await req.json()) as {
      assetType: string;
      transactionType: string;
      name: string;
      ticker: string;
      index: string;
      amount: number;
      price: number;
      portfolioId: string;
    };

    if (assetType === "stock") {
      const data = await prisma.stockAsset.findFirst({
        where: {
          AND: [
            { name: { equals: String(name) } },
            { portfolioId: { equals: String(portfolioId) } },
          ],
        },
        select: { id: true, amount: true, average: true },
      });

      console.log("Data from stockAsset: ", data);
      console.log("Portfolio ID from request: ", portfolioId);
      console.log("Trans type: ", transactionType);
      console.log("ID from data: ", data?.id);

      if (data !== null && data.average > 0.0 && data.amount > 0) {
        const ttl_amt =
          transactionType === "long"
            ? data.amount + Number(amount)
            : data.amount - Number(amount);
        console.log("Total Amount: ", ttl_amt);
        const average =
          transactionType === "long"
            ? (data.average * data.amount + Number(price) * Number(amount)) /
              ttl_amt
            : data.average;
        const profit =
          transactionType === "short"
            ? price * Number(amount) - average * Number(amount)
            : null;
        console.log("Profit: ", profit);
        if (transactionType === "short")
          await prisma.$executeRaw`
            UPDATE "Fiat" 
            SET "amount" = "amount" + ${Number(amount) * Number(price)}
            WHERE "portfolioId" = ${String(portfolioId)};`

        const stock = await updateAsset(
          data.id,
          portfolioId,
          amount,
          ttl_amt,
          price,
          profit,
          average,
          transactionType,
          assetType
        );
        return NextResponse.json(stock);
      } else if (data === null) {
        const stock = await createAsset(
          portfolioId,
          name,
          ticker,
          index,
          amount,
          price,
          transactionType,
          assetType
        );
        return NextResponse.json(stock);
      }
    } else if (assetType === "crypto") {
      const data = await prisma.cryptoAsset.findFirst({
        where: {
          AND: [
            { name: { equals: String(name) } },
            { portfolioId: { equals: String(portfolioId) } },
          ],
        },
        select: { id: true, amount: true, average: true },
      });

      if (data !== null && data.average > 0.0 && data.amount > 0) {
        const ttl_amt = data.amount + Number(amount);
        const average =
          transactionType === "long"
            ? (data.average * data.amount + Number(price) * Number(amount)) /
              ttl_amt
            : data.average;
        const profit =
          transactionType === "short"
            ? price * amount - average * amount
            : null;
        const crypto = await updateAsset(
          data.id,
          portfolioId,
          amount,
          ttl_amt,
          price,
          profit,
          average,
          transactionType,
          assetType
        );
        return NextResponse.json(crypto);
      } else if (data === null) {
        const crypto = await createAsset(
          portfolioId,
          name,
          ticker,
          index,
          amount,
          price,
          transactionType,
          assetType
        );
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
