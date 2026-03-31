import workflowPkg from 'workflow/next';
const { withWorkflow } = workflowPkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'image.pollinations.ai' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'magicasro.cloud' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    if (isProd) {
      securityHeaders.push(
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
      );
    }

    const cspDirectives = [
      "default-src 'self';",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
      "img-src 'self' blob: data: https://images.unsplash.com https://images.pexels.com https://via.placeholder.com https://magicasro.cloud https://image.pollinations.ai https://*.supabase.co;",
      "font-src 'self' https://fonts.gstatic.com;",
      "connect-src 'self' https://magicasro.cloud https://*.supabase.co https://api.vercel.com;",
      "worker-src 'self';",
      "frame-ancestors 'none';",
      "object-src 'none';",
      "base-uri 'self';",
      "form-action 'self';",
    ];

    if (isProd) {
      cspDirectives.push("upgrade-insecure-requests;");
    }

    securityHeaders.push({
      key: "Content-Security-Policy",
      value: cspDirectives.join(" "),
    });

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/manifest.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default withWorkflow(nextConfig);
