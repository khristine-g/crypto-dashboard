"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true`
        );
        const data = await res.json();
        setCoin(data);
      } catch (error) {
        console.error("Error fetching coin:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCoin();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400 animate-pulse">
        Loading coin data...
      </p>
    );
  if (!coin)
    return (
      <p className="text-center mt-10 text-gray-400">
        Coin not found.
      </p>
    );

  return (
    <main className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-100 min-h-screen">
      {/* Back link */}
      <Link
        href="/"
        className="text-indigo-400 hover:text-indigo-500 transition"
      >
        ← Back
      </Link>

      {/* Coin header */}
      <div className="flex items-center gap-4 mt-4">
        <img src={coin.image.large} alt={coin.name} className="w-14 h-14" />
        <h1 className="text-3xl font-bold text-white">
          {coin.name} ({coin.symbol.toUpperCase()})
        </h1>
      </div>

      {/* Coin details */}
      <div className="mt-6 bg-gray-800 shadow-lg rounded-lg p-6">
        <p className="text-lg">
          Current Price:{" "}
          <span className="font-semibold text-white">
            ${coin.market_data.current_price.usd.toLocaleString()}
          </span>
        </p>
        <p className="text-lg">
          Market Cap:{" "}
          <span className="font-semibold text-white">
            ${coin.market_data.market_cap.usd.toLocaleString()}
          </span>
        </p>
        <p className="text-lg">
          24h High:{" "}
          <span className="font-semibold text-green-400">
            ${coin.market_data.high_24h.usd.toLocaleString()}
          </span>
        </p>
        <p className="text-lg">
          24h Low:{" "}
          <span className="font-semibold text-red-400">
            ${coin.market_data.low_24h.usd.toLocaleString()}
          </span>
        </p>

        <p className="mt-4 text-gray-400">
          {coin.description.en ? coin.description.en.slice(0, 300) : "No description available..."}
        </p>
      </div>
    </main>
  );
}
