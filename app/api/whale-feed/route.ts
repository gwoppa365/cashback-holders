import { NextResponse } from "next/server";

const HELIUS_KEY = "3828c255-1da3-4418-9997-9f72f6fcca65";

// Track top holders of major Solana memecoins as whale wallets
const WHALE_TOKENS = [
  { mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", label: "BONK Whale" },
  { mint: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", label: "WIF Whale"  },
  { mint: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr", label: "POPCAT Whale" },
];

// Known program / exchange addresses to skip
const EXCLUDE = new Set([
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
  "11111111111111111111111111111111",
  "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
  "So11111111111111111111111111111111111111112",
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJe1bfF",
]);

function shortWallet(w: string) {
  return w.length > 8 ? `${w.slice(0, 4)}...${w.slice(-4)}` : w;
}

async function getTopHolders(mint: string): Promise<string[]> {
  try {
    const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0", id: "gh",
        method: "getTokenAccounts",
        params: { mint, limit: 15, page: 1, options: { showZeroBalance: false } },
      }),
    });
    const data = await res.json();
    const accounts: any[] = data.result?.token_accounts ?? [];
    return accounts
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .map((a) => a.owner as string)
      .filter((w) => w && !EXCLUDE.has(w));
  } catch {
    return [];
  }
}

async function getSolPrice(): Promise<number> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data?.solana?.usd ?? 150;
  } catch {
    return 150;
  }
}

function parseSwapTx(tx: any, wallet: string, solPrice: number, whaleLabel: string) {
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

    if (received && solOut >= 0.5) {
      return {
        wallet: shortWallet(wallet),
        walletFull: wallet,
        whaleLabel,
        type: "BUY" as const,
        symbol,
        mint,
        sol: parseFloat(solOut.toFixed(3)),
        usd: Math.round(solOut * solPrice),
        timestamp: tx.timestamp * 1000,
        sig: tx.signature,
        source: tx.source ?? "UNKNOWN",
      };
    }
    if (sent && solIn >= 0.5) {
      return {
        wallet: shortWallet(wallet),
        walletFull: wallet,
        whaleLabel,
        type: "SELL" as const,
        symbol,
        mint,
        sol: parseFloat(solIn.toFixed(3)),
        usd: Math.round(solIn * solPrice),
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
    // Fetch top holders of all whale tokens + SOL price in parallel
    const [holderSets, solPrice] = await Promise.all([
      Promise.all(WHALE_TOKENS.map((t) => getTopHolders(t.mint))),
      getSolPrice(),
    ]);

    // Map wallet → label (first match wins), deduplicate
    const walletMap = new Map<string, string>();
    WHALE_TOKENS.forEach(({ label }, i) => {
      holderSets[i].forEach((w) => {
        if (!walletMap.has(w)) walletMap.set(w, label);
      });
    });

    const wallets = Array.from(walletMap.keys()).slice(0, 20);

    if (wallets.length === 0) {
      return NextResponse.json({ trades: [], solPrice });
    }

    // Fetch recent swaps for each whale wallet in parallel
    const results = await Promise.allSettled(
      wallets.map((wallet) =>
        fetch(
          `https://api.helius.xyz/v0/addresses/${wallet}/transactions?api-key=${HELIUS_KEY}&type=SWAP&limit=10`
        )
          .then((r) => r.json())
          .then((txns: any[]) =>
            Array.isArray(txns)
              ? txns
                  .map((tx) => parseSwapTx(tx, wallet, solPrice, walletMap.get(wallet)!))
                  .filter(Boolean)
              : []
          )
          .catch(() => [] as any[])
      )
    );

    const trades = results
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .filter(Boolean)
      .sort((a: any, b: any) => b.timestamp - a.timestamp)
      .slice(0, 50);

    return NextResponse.json({ trades, solPrice, walletCount: wallets.length });
  } catch {
    return NextResponse.json({ trades: [], solPrice: 150, walletCount: 0 }, { status: 500 });
  }
}
