/** @type {import('next').NextConfig} */
function getSupabaseHostname() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!rawUrl) return null;
  try {
    return new URL(rawUrl).hostname;
  } catch {
    return null;
  }
}

const supabaseHostname = getSupabaseHostname();

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['framer-motion'],
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  images: {
    remotePatterns: [
      ...(supabaseHostname
        ? [
            {
              protocol: 'https',
              hostname: supabaseHostname,
              pathname: '/storage/v1/object/public/**',
            },
          ]
        : []),
    ],
  },
}

module.exports = nextConfig 