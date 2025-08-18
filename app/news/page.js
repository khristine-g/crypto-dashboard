"use client";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
        console.log("Using API Key:", apiKey); // debug log

        const res = await fetch(
          `https://newsdata.io/api/1/news?apikey=${apiKey}&q=cryptocurrency&language=en`
        );
        const json = await res.json();
        console.log("NewsData response:", json);

        if (json.status === "success" && Array.isArray(json.results)) {
          setArticles(json.results);
        } else {
          console.error("Unexpected NewsData response:", json);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="py-16 px-6 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Latest Crypto News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length > 0 ? (
            articles.map((article, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-indigo-500/20 transition"
              >
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="rounded-lg mb-4"
                  />
                )}
                <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {article.description?.slice(0, 100)}...
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  Read more →
                </a>
              </div>
            ))
          ) : (
            <p>No news found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
