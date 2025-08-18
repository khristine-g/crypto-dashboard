"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Markets() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          📊 Crypto Markets
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for a coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-gray-400 text-center">Loading market data...</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-gray-900/80 backdrop-blur-lg border border-gray-800">
            <table className="min-w-full text-sm text-gray-300">
              {/* Table Header */}
              <thead className="bg-gray-800/90 text-gray-200 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Coin</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">24h Change</th>
                  <th className="px-4 py-3 text-right">Market Cap</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredCoins.map((coin) => (
                  <motion.tr
                    key={coin.id}
                    className="border-b border-gray-800 hover:bg-gray-800/60 transition duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Coin */}
                    <td className="flex items-center gap-3 px-4 py-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-7 h-7 rounded-full"
                      />
                      <span className="font-semibold text-white">
                        {coin.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {coin.symbol.toUpperCase()}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-right font-semibold text-gray-100">
                      ${coin.current_price.toLocaleString()}
                    </td>

                    {/* 24h Change */}
                    <td
                      className={`px-4 py-3 text-right font-bold ${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>

                    {/* Market Cap */}
                    <td className="px-4 py-3 text-right text-gray-400">
                      ${coin.market_cap.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </section>
  );
}
