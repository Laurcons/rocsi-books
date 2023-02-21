/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/books',
        permanent: true,
      },
    ];
  }
}

module.exports = nextConfig
