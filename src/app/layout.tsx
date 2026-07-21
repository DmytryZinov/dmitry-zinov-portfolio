import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteTitle = "Дмитрий Зинов — продуктовый дизайнер";
const siteDescription =
  "Продуктовый дизайнер. Growth, monetization, TMS, финтех, B2B SaaS.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Дмитрий Зинов",
    // title / description inherit per-page `title` + `description`
  },
  twitter: {
    card: "summary_large_image",
    // title / description inherit per-page `title` + `description`
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-canvas text-ink font-sans antialiased">
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
