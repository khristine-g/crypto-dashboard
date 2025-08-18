"use client";
import { useState } from "react";
import Link from "next/link";
import { Home, LineChart, Newspaper, Briefcase, Info, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: <Home size={20} /> },
  { name: "Markets", href: "/markets", icon: <LineChart size={20} /> },
  { name: "News", href: "/news", icon: <Newspaper size={20} /> },
  { name: "Top Movers", href: "/top-movers", icon: <Briefcase size={20} /> },
  { name: "Alerts", href: "/alerts", icon: <Info size={20} /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-gray-900 text-white px-4 py-3 fixed top-0 left-0 right-0 z-50 shadow-md">
        <h1 className="text-xl font-bold">CryptoDash</h1>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-800 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col overflow-y-auto shadow-lg z-50
          transform transition-transform duration-300
          w-56 sm:w-64
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"} 
          mt-14 md:mt-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-700 px-4">
          <h1 className="text-xl sm:text-2xl font-bold">CryptoDash</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-6 space-y-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-cyan-400 transition"
              onClick={() => setOpen(false)} // close sidebar on mobile
            >
              {link.icon}
              <span className="text-sm sm:text-base font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto mb-4 text-center text-gray-400 text-xs sm:text-sm px-4">
          v1.0.0
        </div>
      </aside>

      {/* Spacer for small screens so content is below top bar */}
      <div className="md:hidden h-14"></div>
    </>
  );
}
