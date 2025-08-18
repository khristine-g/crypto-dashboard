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
      <body className="flex bg-gray-100">
          <SearchProvider>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <div className="mt-6">{children}</div>
        </main>
        </SearchProvider>
      </body>
    </html>
  );
}
