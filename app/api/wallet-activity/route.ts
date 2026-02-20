import { NextRequest, NextResponse } from "next/server";

const HELIUS_KEY = "3828c255-1da3-4418-9997-9f72f6fcca65";

function parseSwapTx(tx: any, wallet: string) {
  try {
    const tokenTransfers: any[] = tx.tokenTransfers ?? [];
    const nativeTransfers: any[] = tx.nativeTransfers ?? [];

    const received = tokenTransfers.find(
      (t) => t.toUserAccount === wallet && Number(t.tokenAmount) > 0
    );
    const sent = tokenTransfers.find(
      (t) => t.fromUserAccount === wallet && Number(t.tokenAmount) > 0
    );

    const solOut = nativeTransfers
      .filter((t) => t.fromUserAccount === wallet)
      .reduce((s, t) => s + t.amount, 0) / 1e9;

    const solIn = nativeTransfers
      .filter((t) => t.toUserAccount === wallet)
      .reduce((s, t) => s + t.amount, 0) / 1e9;

    const mint = received?.mint ?? sent?.mint ?? null;
    const shortMint = mint ? `${mint.slice(0, 4)}...${mint.slice(-4)}` : "?";

    const desc: string = tx.description ?? "";
    const symMatch = desc.match(/for\s+[\d.,]+\s+([A-Z]{2,10})\b/);
    const symbol = symMatch ? symMatch[1] : shortMint;

    if (received && solOut > 0.001) {
      return {
        type: "BUY" as const, symbol, mint,
        sol: parseFloat(solOut.toFixed(4)),
        timestamp: tx.timestamp * 1000,
        sig: tx.signature,
        source: tx.source ?? "UNKNOWN",
      };
    }
    if (sent && solIn > 0.001) {
      return {
        type: "SELL" as const, symbol, mint,
        sol: parseFloat(solIn.toFixed(4)),
        timestamp: tx.timestamp * 1000,
        sig: tx.signature,
        source: tx.source ?? "UNKNOWN",
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const wallet = req.nextUrl.searchParams.get("wallet");
  if (!wallet || wallet.length < 32) {
    return NextResponse.json({ error: "Invalid wallet" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.helius.xyz/v0/addresses/${wallet}/transactions?api-key=${HELIUS_KEY}&type=SWAP&limit=20`
    );
    const txns = await res.json();

    if (!Array.isArray(txns)) {
      return NextResponse.json({ trades: [], wallet });
    }

    const trades = txns
      .map((tx) => parseSwapTx(tx, wallet))
      .filter(Boolean)
      .slice(0, 20);

    return NextResponse.json({ trades, wallet });
  } catch {
    return NextResponse.json({ trades: [], wallet }, { status: 500 });
  }
}
