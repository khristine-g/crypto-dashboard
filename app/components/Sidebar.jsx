"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, LineChart, Newspaper, Briefcase, Info } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: <Home size={18} /> },
  { name: "Markets", href: "/markets", icon: <LineChart size={18} /> },
  { name: "News", href: "/news", icon: <Newspaper size={18} /> },
  { name: "Top Movers", href: "/top-movers", icon: <Briefcase size={18} /> },
  { name: "Alerts", href: "/alerts", icon: <Info size={18} /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-56 sm:w-64 bg-gray-900 flex-col shadow-lg overflow-y-auto z-50">
        <div className="flex items-center justify-center h-16 border-b border-gray-700 px-4">
          <h1 className="text-xl sm:text-2xl font-bold">CryptoDash</h1>
        </div>

        <nav className="flex flex-col mt-6 space-y-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-cyan-400 transition"
            >
              {link.icon}
              <span className="text-sm sm:text-base font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto mb-4 text-center text-gray-400 text-xs sm:text-sm px-4">
          v1.0.0
        </div>
      </aside>

      {/* Mobile Sidebar (slides from top) */}
      <div className="md:hidden flex flex-col bg-gray-900 shadow-lg">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium hover:bg-gray-800 hover:text-cyan-400 transition"
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
