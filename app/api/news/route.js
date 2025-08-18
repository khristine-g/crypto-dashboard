// app/api/news/route.js
export async function GET() {
  const apiKey = process.env.NEWSDATA_API_KEY;
  const res = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto`);
  const data = await res.json();

  return Response.json(data);
}
