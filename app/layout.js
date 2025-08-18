- "use client";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { SearchProvider } from "./context/SearchContext";

export const metadata = {
  title: "Crypto Dashboard",
  description: "Next.js Crypto Dashboard with Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <SearchProvider>
          <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
            <main className="flex-1 p-2 sm:p-4 md:p-6 md:ml-56 sm:ml-64 w-full text-xs sm:text-sm md:text-base">
              <Navbar />
              <div className="mt-4 sm:mt-6">{children}</div>
            </main>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
