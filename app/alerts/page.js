"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [coin, setCoin] = useState("");
  const [condition, setCondition] = useState("below");
  const [price, setPrice] = useState("");
  const [notifications, setNotifications] = useState([]);

  // ✅ Add alert
  const addAlert = () => {
    if (!coin || !price) return;
    const newAlert = { coin: coin.toLowerCase(), condition, price: parseFloat(price) };
    setAlerts([...alerts, newAlert]);
    setCoin("");
    setPrice("");
  };

  // ✅ Check alerts against live CoinGecko prices
  useEffect(() => {
    if (alerts.length === 0) return;

    const interval = setInterval(async () => {
      try {
        const ids = alerts.map((a) => a.coin).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );
        const data = await res.json();

        alerts.forEach((alert) => {
          const currentPrice = data[alert.coin]?.usd;
          if (!currentPrice) return;

          if (
            (alert.condition === "below" && currentPrice < alert.price) ||
            (alert.condition === "above" && currentPrice > alert.price)
          ) {
            setNotifications((prev) => [
              ...prev,
              `🚨 ${alert.coin.toUpperCase()} is ${alert.condition} $${alert.price} (current: $${currentPrice})`
            ]);
          }
        });
      } catch (error) {
        console.error("Error checking prices:", error);
      }
    }, 10000); // every 10s

    return () => clearInterval(interval);
  }, [alerts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6"> Price Alerts</h1>

      {/* Input form */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-6 max-w-xl">
        <h2 className="text-xl mb-4">Set a New Alert</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Coin (e.g. bitcoin)"
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 text-white border border-gray-600 flex-1"
          />
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 text-white border border-gray-600"
          >
            <option value="below">Below</option>
            <option value="above">Above</option>
          </select>
          <input
            type="number"
            placeholder="Price in USD"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 rounded-lg bg-gray-900 text-white border border-gray-600 flex-1"
          />
          <button
            onClick={addAlert}
            className="px-5 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Active alerts */}
      <div className="max-w-xl mb-6">
        <h2 className="text-2xl mb-3">Active Alerts</h2>
        {alerts.length === 0 ? (
          <p className="text-gray-400">No alerts set yet.</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((a, i) => (
              <li
                key={i}
                className="bg-gray-800 p-3 rounded-lg flex justify-between"
              >
                <span>
                  {a.coin.toUpperCase()} {a.condition} ${a.price}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Notifications */}
      <div className="max-w-xl">
        <h2 className="text-2xl mb-3">Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-400">No alerts triggered yet.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-600 p-3 rounded-lg"
              >
                {n}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
