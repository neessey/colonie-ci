// app/admin/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      disallow: '/admin/',
    },
    sitemap: 'https://colonie-ci.com/sitemap.xml',
  };
}