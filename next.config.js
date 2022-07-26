/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["de_DE", "en_US"],
    defaultLocale: "de_DE",
    localeDetection: false,
  },
  domains: [
    {
      domain: "juedische-stimme.com",
      defaultLocale: "en_US",
      locales: ["en_US"],
    },
    {
      domain: "www.juedische-stimme.com",
      defaultLocale: "en_US",
      locales: ["en_US"],
    },
  ],
  images: {
    domains: [
      "localhost",
      "www.juedische-stimme.com",
      "juedische-stimme.com",
      "www.juedische-stimme.de",
      "juedische-stimme.de",
    ],
    // formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: "/:year(\\d{1,})/:month/:day/:name",
        destination: "/:name",
        permanent: true,
      },
      {
        source: "/tag/:slug",
        destination: "/tag/:slug/page/1",
        permanent: false,
      },
      {
        source: "/category/:name",
        destination: "/category/:name/page/1",
        permanent: false,
      },
      {
        source: "/search/:phrase",
        destination: "/search/:phrase/page/1",
        permanent: false,
      },
      {
        source: "/admin/posts",
        destination: "/admin/posts/category/Aktuelles/page/1",
        permanent: false,
      },
      {
        source: "/admin/media",
        destination: "/admin/media/page/1",
        permanent: false,
      },
      {
        source: "/admin/pages",
        destination: "/admin/pages/page/1",
        permanent: false,
      },
      {
        source: "/admin/users",
        destination: "/admin/users/page/1",
        permanent: false,
      },
      {
        source: "/admin/galleries",
        destination: "/admin/galleries/page/1",
        permanent: false,
      },
      {
        source: "/admin/categories",
        destination: "/admin/categories/page/1",
        permanent: false,
      },
      {
        source: "/hilf-uns",
        destination: "/spenden",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
