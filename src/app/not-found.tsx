// Til aniqlanmagan (middleware'dan tashqari) so'rovlar uchun oddiy 404
export default function NotFound() {
  return (
    <html lang="uz">
      <body style={{ background: "#0a0a0a", color: "#e4e4e7", fontFamily: "sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center" }}>
          <div>
            <h1 style={{ fontSize: 64, margin: 0 }}>404</h1>
            <p>Sahifa topilmadi · Page not found</p>
            <a href="/" style={{ color: "#a1a1aa" }}>husanbek-coder.uz</a>
          </div>
        </main>
      </body>
    </html>
  );
}
