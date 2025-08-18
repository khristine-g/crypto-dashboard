"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearch } from "./context/SearchContext"; // make sure path is correct

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-400 text-lg animate-pulse">
        Loading crypto data...
      </p>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 sm:p-6 md:p-8">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Crypto Dashboard
      </h1>

      {/* Table for medium+ screens */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-xl bg-gray-900/70 backdrop-blur-lg border border-gray-800">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-gray-800/90 text-gray-300 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Coin</th>
              <th className="p-4 text-right">Price</th>
              <th className="p-4 text-right">Market Cap</th>
              <th className="p-4 text-right">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin, index) => (
              <tr
                key={coin.id}
                className="border-b border-gray-800 hover:bg-gray-800/60 transition duration-200"
              >
                <td className="p-4 text-gray-500 font-medium">{index + 1}</td>
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <Link
                      href={`/coin/${coin.id}`}
                      className="font-semibold text-white hover:text-cyan-400 transition"
                    >
                      {coin.name}
                    </Link>
                    <p className="text-xs text-gray-400">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-right font-medium text-gray-100">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td className="p-4 text-right text-gray-400">
                  ${coin.market_cap.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm font-bold ${
                      coin.price_change_percentage_24h > 0
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden space-y-4">
        {filteredCoins.map((coin, index) => (
          <div
            key={coin.id}
            className="bg-gray-800/70 rounded-2xl p-4 shadow-md flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                <div>
                  <Link
                    href={`/coin/${coin.id}`}
                    className="font-semibold text-white hover:text-cyan-400 transition"
                  >
                    {coin.name}
                  </Link>
                  <p className="text-xs text-gray-400">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-lg text-sm font-bold ${
                  coin.price_change_percentage_24h > 0
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between text-gray-300 text-sm">
              <p>Price: ${coin.current_price.toLocaleString()}</p>
              <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
