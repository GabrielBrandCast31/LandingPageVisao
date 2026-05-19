"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent } from "./CookieBanner";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readConsent() === "accepted");
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setEnabled(detail === "accepted");
    };
    window.addEventListener("visao:consent", handler);
    return () => window.removeEventListener("visao:consent", handler);
  }, []);

  if (!enabled) return null;

  return (
    <>
      {GTM_ID && (
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      )}
      {META_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
          }}
        />
      )}
    </>
  );
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    fbq?: (cmd: string, name: string, params?: unknown) => void;
    dataLayer?: unknown[];
  };
  if (w.fbq) w.fbq("trackCustom", name, params);
  if (w.dataLayer) w.dataLayer.push({ event: name, ...params });
}
