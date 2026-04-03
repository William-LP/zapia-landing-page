// Root layout pass-through. The actual HTML structure (html, body, lang attribute)
// is handled by app/[lang]/layout.tsx. The proxy.ts redirects / to /en/ automatically.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
