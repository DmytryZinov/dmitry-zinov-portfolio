/**
 * Production site origin for metadataBase / sitemap / robots.
 *
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (recommended for production)
 * 2. Vercel production / deployment host
 * 3. http://localhost:3000 (local only)
 */
export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return new URL(configured.replace(/\/+$/, ""));
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (vercelHost) {
    const host = vercelHost.replace(/^https?:\/\//, "").replace(/\/+$/, "");
    return new URL(`https://${host}`);
  }

  return new URL("http://localhost:3000");
}
