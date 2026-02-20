import { NextRequest, NextResponse } from "next/server";

const HELIUS_KEY  = "3828c255-1da3-4418-9997-9f72f6fcca65";
const HELIUS_RPC  = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;
const CA          = "EvNMpVBdSMCZLSjnjkcMHwAyYhRCtD4Xuewe8WWJpump";
const PRO_MINIMUM = 1_000_000; // 1M tokens

export async function GET(req: NextRequest) {
  const wallet = req.nextUrl.searchParams.get("wallet");
  if (!wallet || wallet.length < 32) {
    return NextResponse.json({ error: "Invalid wallet" }, { status: 400 });
  }

  try {
    const res = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0", id: "pro",
        method: "getTokenAccounts",
        params: {
          owner: wallet,
          mint:  CA,
          limit: 1,
          options: { showZeroBalance: false },
        },
      }),
    });

    const data = await res.json();
    const accounts: any[] = data.result?.token_accounts ?? [];
    const rawAmount  = accounts[0]?.amount ?? 0;
    const balance    = Number(rawAmount) / 1_000_000; // 6 decimals
    const isPro      = balance >= PRO_MINIMUM;

    return NextResponse.json({ wallet, balance, isPro, minimum: PRO_MINIMUM });
  } catch {
    return NextResponse.json({ wallet, balance: 0, isPro: false, minimum: PRO_MINIMUM });
  }
}
