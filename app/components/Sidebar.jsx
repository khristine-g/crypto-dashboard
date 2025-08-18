"use client";
import { useState } from "react";
import Link from "next/link";
import { Home, LineChart, Newspaper, Briefcase, Info, Menu } from "lucide-react";

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
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">CryptoDash</h1>
        <button onClick={() => setOpen(!open)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h1 className="text-2xl font-bold">CryptoDash</h1>
        </div>
        <nav className="flex flex-col mt-6 space-y-2 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
              onClick={() => setOpen(false)}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
