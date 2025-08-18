"use client";

import { Bell, Sun, Moon, User, Search } from "lucide-react";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const { search, setSearch } = useSearch();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="w-full bg-gray-900 shadow-md px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-lg sm:text-xl font-bold text-white">CryptoDash</h1>

      {/* Search bar */}
      <div className="flex-1 mx-4 relative">
        {/* Desktop search */}
        <input
          type="text"
          placeholder="Search coins, markets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="hidden md:block w-full px-3 py-2 rounded-xl border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        {/* Mobile search toggle */}
        <button
          className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-800 transition"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <Search className="w-5 h-5 text-gray-300" />
        </button>

        {/* Mobile search input */}
        {showMobileSearch && (
          <input
            type="text"
            placeholder="Search coins, markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:hidden w-full px-3 py-2 rounded-xl border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none mt-2"
          />
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-800 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-300" />
          )}
        </button>

        <button className="p-2 rounded-full hover:bg-gray-800 transition">
          <Bell className="w-5 h-5 text-gray-300" />
        </button>

        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-800 transition">
          <User className="w-5 h-5 text-gray-300" />
          <span className="hidden sm:inline text-sm text-gray-300">Profile</span>
        </button>
      </div>
    </header>
  );
}
