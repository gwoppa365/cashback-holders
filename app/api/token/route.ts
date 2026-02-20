import { NextResponse } from "next/server";

const CA          = "EvNMpVBdSMCZLSjnjkcMHwAyYhRCtD4Xuewe8WWJpump";
const HELIUS_KEY  = "3828c255-1da3-4418-9997-9f72f6fcca65";
const HELIUS_RPC  = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;

export async function GET() {
  try {
    const [dexRes, heliusRes] = await Promise.all([
      fetch(`https://api.dexscreener.com/latest/dex/tokens/${CA}`, {
        next: { revalidate: 30 },
      }),
      fetch(HELIUS_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "holders",
          method: "getTokenAccounts",
          params: {
            mint: CA,
            limit: 1,
            page: 1,
            options: { showZeroBalance: false },
          },
        }),
        next: { revalidate: 60 },
      }),
    ]);

    const dexData    = await dexRes.json();
    const heliusData = await heliusRes.json();

    const pair        = dexData.pairs?.[0] ?? null;
    const holderCount = heliusData.result?.total ?? 0;

    // Derive SOL price from priceUsd / priceNative so we can express fees in SOL
    let feesEstimatedSol: number | null = null;
    if (pair?.priceUsd && pair?.priceNative && pair?.volume?.h24) {
      const solPriceUsd  = parseFloat(pair.priceUsd) / parseFloat(pair.priceNative);
      const volumeSol    = pair.volume.h24 / solPriceUsd;
      feesEstimatedSol   = parseFloat((volumeSol * 0.005).toFixed(4));
    }

    return NextResponse.json({
      price:              pair ? parseFloat(pair.priceUsd) : null,
      priceNative:        pair ? parseFloat(pair.priceNative) : null,
      priceChange24h:     pair?.priceChange?.h24 ?? null,
      marketCap:          pair?.marketCap ?? null,
      fdv:                pair?.fdv ?? null,
      volume24h:          pair?.volume?.h24 ?? null,
      liquidity:          pair?.liquidity?.usd ?? null,
      txns24h:            pair ? (pair.txns?.h24?.buys ?? 0) + (pair.txns?.h24?.sells ?? 0) : null,
      holders:            holderCount,
      feesEstimatedSol,
      dexUrl:             pair?.url ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch token data" }, { status: 500 });
  }
}
