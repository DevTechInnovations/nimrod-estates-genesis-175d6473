import fs from 'fs';
import path from 'path';

// List all the routes in the application
const routes = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/services', priority: '0.8' },
  { path: '/properties', priority: '0.8' },
  { path: '/properties/:id', priority: '0.6' },
  { path: '/contact', priority: '0.8' },
  { path: '/auth', priority: '0.5' },
  { path: '/member-auth', priority: '0.5' },
  { path: '/dashboard', priority: '0.7' },
  { path: '/settings', priority: '0.7' },
  { path: '/admin', priority: '0.7' },
  { path: '/pricing', priority: '0.8' },
  { path: '/services/real-estate', priority: '0.7' },
  { path: '/services/wealth-investment', priority: '0.7' },
  { path: '/services/business-consulting', priority: '0.7' },
  { path: '/services/business-setup', priority: '0.7' },
  { path: '/services/property-development', priority: '0.7' },
  { path: '/DevelopmentForm', priority: '0.6' },
  { path: '/404', priority: '0.1' },  // NotFound page
];

// Function to generate the sitemap XML
const generateSitemap = (routes) => {
  const urlSet = routes
    .map((route) => {
      return `
        <url>
          <loc>${'https://nimrodestates.com' + route.path}</loc>
          <priority>${route.priority}</priority>
        </url>`;
    })
    .join('\n');

  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://nimrodestates.com/schemas/sitemap/0.9">
    ${urlSet}
  </urlset>`;
};

// Generate the sitemap XML string
const sitemap = generateSitemap(routes);

// Write the sitemap to a file (public directory or root of the project)
fs.writeFileSync(path.join('public', 'sitemap.xml'), sitemap);

console.log('Sitemap generated at public/sitemap.xml');
