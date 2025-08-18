"use client";

import { useEffect, useState } from "react";

export default function TopMovers() {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopMovers = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await res.json();

        // Sort by % change
        const sorted = [...data].sort(
          (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
        );

        setGainers(sorted.slice(0, 5)); // top 5 gainers
        setLosers(sorted.slice(-5).reverse()); // top 5 losers
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top movers:", error);
      }
    };

    fetchTopMovers();
  }, []);

  return (
    <section className="py-16 px-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
           Top Movers (24h)
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Gainers */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-green-400 mb-6">
                Biggest Gainers
              </h2>
              <ul className="space-y-4">
                {gainers.map((coin) => (
                  <li
                    key={coin.id}
                    className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-white font-medium">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </span>
                    </div>
                    <span className="text-green-400 font-bold">
                      +{coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Losers */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-red-400 mb-6">
                Biggest Losers
              </h2>
              <ul className="space-y-4">
                {losers.map((coin) => (
                  <li
                    key={coin.id}
                    className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-white font-medium">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </span>
                    </div>
                    <span className="text-red-400 font-bold">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
