import { NextResponse } from "next/server";

const HELIUS_KEY = "3828c255-1da3-4418-9997-9f72f6fcca65";
const CA         = "EvNMpVBdSMCZLSjnjkcMHwAyYhRCtD4Xuewe8WWJpump";

function shortWallet(w: string) {
  return w.length > 8 ? `${w.slice(0, 4)}...${w.slice(-4)}` : w;
}

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

    // Try to extract symbol from description
    const desc: string = tx.description ?? "";
    const symMatch = desc.match(/for\s+[\d.,]+\s+([A-Z]{2,10})\b/);
    const symbol = symMatch ? symMatch[1] : shortMint;

    if (received && solOut > 0.005) {
      return {
        wallet: shortWallet(wallet),
        walletFull: wallet,
        type: "BUY" as const,
        symbol,
        mint,
        sol: parseFloat(solOut.toFixed(4)),
        timestamp: tx.timestamp * 1000,
        sig: tx.signature,
        source: tx.source ?? "UNKNOWN",
      };
    }
    if (sent && solIn > 0.005) {
      return {
        wallet: shortWallet(wallet),
        walletFull: wallet,
        type: "SELL" as const,
        symbol,
        mint,
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

export async function GET() {
  try {
    // Get top holders to use as whale wallets
    const holdersRes = await fetch(
      `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0", id: "wh",
          method: "getTokenAccounts",
          params: { mint: CA, limit: 8, page: 1, options: { showZeroBalance: false } },
        }),
      }
    );
    const holdersData = await holdersRes.json();
    const accounts: any[] = holdersData.result?.token_accounts ?? [];
    const wallets = accounts
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .slice(0, 8)
      .map((a) => a.owner as string)
      .filter(Boolean);

    if (wallets.length === 0) {
      return NextResponse.json({ trades: [] });
    }

    // Fetch recent swap txns for each whale wallet (parallel, limit 5 each)
    const results = await Promise.allSettled(
      wallets.map((wallet) =>
        fetch(
          `https://api.helius.xyz/v0/addresses/${wallet}/transactions?api-key=${HELIUS_KEY}&type=SWAP&limit=5`
        )
          .then((r) => r.json())
          .then((txns: any[]) =>
            Array.isArray(txns)
              ? txns.map((tx) => parseSwapTx(tx, wallet)).filter(Boolean)
              : []
          )
          .catch(() => [] as any[])
      )
    );

    const trades = results
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .filter(Boolean)
      .sort((a: any, b: any) => b.timestamp - a.timestamp)
      .slice(0, 30);

    return NextResponse.json({ trades });
  } catch {
    return NextResponse.json({ trades: [] }, { status: 500 });
  }
}
