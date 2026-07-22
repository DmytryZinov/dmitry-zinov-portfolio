"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export const YM_ID = 110941806;

declare global {
  interface Window {
    ym?: (
      id: number,
      method: string,
      ...args: Array<string | Record<string, unknown>>
    ) => void;
  }
}

function YandexMetrikaHits() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstHit = useRef(true);

  useEffect(() => {
    // Initial pageview is recorded by ym(... 'init' ...).
    if (isFirstHit.current) {
      isFirstHit.current = false;
      return;
    }

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.ym?.(YM_ID, "hit", url);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Yandex.Metrika counter for the App Router.
 * Loads once via next/script; sends hit on client-side navigations.
 */
export function YandexMetrika() {
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">{`
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
    }
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');

ym(${YM_ID}, 'init', {
    ssr:true,
    webvisor:true,
    clickmap:true,
    ecommerce:"dataLayer",
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce:true,
    trackLinks:true
});
`}</Script>
      <Suspense fallback={null}>
        <YandexMetrikaHits />
      </Suspense>
    </>
  );
}
