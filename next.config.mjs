import workflowPkg from 'workflow/next';
const { withWorkflow } = workflowPkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;",
              "img-src 'self' blob: data: https://images.unsplash.com https://magicasro.cloud https://image.pollinations.ai https://*.supabase.co;",
              "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;",
              "connect-src 'self' https://magicasro.cloud https://*.supabase.co https://api.vercel.com;",
              "frame-ancestors 'none';",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
              "upgrade-insecure-requests;",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default withWorkflow(nextConfig);
