import type { Metadata } from "next";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { LightboxProvider } from "@/components/lightbox";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { YandexMetrika } from "@/components/layout/YandexMetrika";
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
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen bg-canvas text-ink font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("dz-intro-seen")==="1"||window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-seen")}}catch(e){}})();`,
          }}
        />
        <LightboxProvider>
          <IntroLoader />
          <CustomCursor />
          <SmoothScroll>
            <ScrollToTop />
            <main className="w-full">{children}</main>
          </SmoothScroll>
          <YandexMetrika />
        </LightboxProvider>
      </body>
    </html>
  );
}
