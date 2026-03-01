import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlackRoad OS Demo",
  description: "BlackRoad OS demo application with Light Trinity and Codex integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
