import { NextResponse } from "next/server";
import { TOTAL_SUPPLY } from "@/lib/constants";

const CA         = "EvNMpVBdSMCZLSjnjkcMHwAyYhRCtD4Xuewe8WWJpump";
const HELIUS_KEY = "3828c255-1da3-4418-9997-9f72f6fcca65";
const HELIUS_RPC = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_KEY}`;

export async function GET() {
  try {
    const res = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "top-holders",
        method: "getTokenAccounts",
        params: {
          mint: CA,
          limit: 50,
          page: 1,
          options: { showZeroBalance: false },
        },
      }),
      next: { revalidate: 60 },
    });

    const data     = await res.json();
    const accounts: any[] = data.result?.token_accounts ?? [];
    const total: number   = data.result?.total ?? 0;

    // Sort by amount descending
    const sorted = [...accounts].sort(
      (a, b) => Number(b.amount ?? 0) - Number(a.amount ?? 0)
    );

    const holders = sorted.map((acc: any, i: number) => {
      // Pump.fun tokens have 6 decimals
      const balance = Number(acc.amount ?? 0) / 1_000_000;
      const pct     = parseFloat(((balance / TOTAL_SUPPLY) * 100).toFixed(2));
      const owner: string = acc.owner ?? "";

      let badge: string;
      if (pct >= 5)      badge = "diamond";
      else if (pct >= 2) badge = "strong";
      else               badge = "weak";

      return {
        rank:       i + 1,
        wallet:     owner.length > 8 ? `${owner.slice(0, 4)}...${owner.slice(-4)}` : owner,
        walletFull: owner,
        balance:    Math.round(balance),
        pct,
        holdDays:   null,
        holdHours:  null,
        isDev:      false,
        badge,
      };
    });

    return NextResponse.json({ holders, total });
  } catch {
    return NextResponse.json({ error: "Failed to fetch holders" }, { status: 500 });
  }
}
