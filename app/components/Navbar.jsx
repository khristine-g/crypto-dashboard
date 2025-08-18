"use client";

import { Bell, Sun, Moon, User } from "lucide-react";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true); // default dark
  const { search, setSearch } = useSearch();

  return (
    <header className="w-full bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-xl font-bold text-white">CryptoDash</h1>

      {/* Search bar */}
      <div className="hidden md:flex items-center w-1/3">
        <input
          type="text"
          placeholder="Search coins, markets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-800"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-300" />
          )}
        </button>
        <button className="p-2 rounded-full hover:bg-gray-800">
          <Bell className="w-5 h-5 text-gray-300" />
        </button>
        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-800">
          <User className="w-5 h-5 text-gray-300" />
          <span className="hidden md:inline text-sm text-gray-300">Profile</span>
        </button>
      </div>
    </header>
  );
}
