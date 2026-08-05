import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://childrenofcapital.vercel.app';

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'articles', priority: '0.9', changefreq: 'daily' },
  { path: 'submission-hub', priority: '0.8', changefreq: 'weekly' },
  { path: 'contact', priority: '0.7', changefreq: 'monthly' }
];

async function generateSitemap() {
  try {
    const mockDataPath = path.join(__dirname, '../src/data/mockData.js');
    const fileContent = fs.readFileSync(mockDataPath, 'utf8');

    // Extract ARTICLES array items or slugs/IDs using regex
    const articleIds = [];
    const idRegex = /id:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = idRegex.exec(fileContent)) !== null) {
      if (match[1] && match[1] !== 'anviksha-singh') {
        articleIds.push(match[1]);
      }
    }

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static routes
    staticRoutes.forEach(route => {
      const url = route.path ? `${BASE_URL}/${route.path}` : `${BASE_URL}/`;
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Article routes
    articleIds.forEach(id => {
      const cleanUrl = `${BASE_URL}/article/${encodeURIComponent(id)}`;
      xml += `  <url>\n`;
      xml += `    <loc>${cleanUrl}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml, 'utf8');
    console.log(`[SEO] sitemap.xml generated successfully at ${outputPath}`);
  } catch (err) {
    console.error('[SEO] Error generating sitemap.xml:', err);
  }
}

generateSitemap();
