import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://childrenofcapital.vercel.app';

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'articles', priority: '0.9', changefreq: 'daily' },
  { path: 'submission-hub', priority: '0.8', changefreq: 'weekly' },
  { path: 'contact', priority: '0.7', changefreq: 'monthly' }
];

function getMongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const envPath = path.join(__dirname, '../backend/.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGODB_URI=(.+)/);
    if (match) return match[1].trim();
  }
  return null;
}

function formatDate(dateInput) {
  if (!dateInput) return new Date().toISOString().split('T')[0];
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
  return d.toISOString().split('T')[0];
}

async function fetchProductionArticles() {
  // 1. Try API if running
  const apiUrl = process.env.VITE_API_URL || process.env.API_URL || 'http://localhost:5001';
  try {
    const res = await fetch(`${apiUrl}/api/articles`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        console.log(`[SEO] Retrieved ${data.data.length} production articles from backend API.`);
        return data.data;
      }
    }
  } catch (err) {
    // API server not running locally, proceed to direct DB connection
  }

  // 2. Direct MongoDB Atlas Connection (Production Source of Truth)
  const mongoUri = getMongoUri();
  if (mongoUri) {
    let client;
    try {
      client = new MongoClient(mongoUri);
      await client.connect();
      const db = client.db();
      const articles = await db.collection('articles').find({}).toArray();
      console.log(`[SEO] Retrieved ${articles.length} production articles from MongoDB.`);
      await client.close();
      return articles;
    } catch (err) {
      if (client) await client.close().catch(() => {});
      console.error('[SEO] Failed to connect to MongoDB:', err.message);
    }
  }

  return [];
}

async function generateSitemap() {
  try {
    const articles = await fetchProductionArticles();
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

    // Dynamic Article routes using production slugs & real lastmod
    const seenSlugs = new Set();
    articles.forEach(article => {
      const slug = article.slug;
      if (!slug || seenSlugs.has(slug)) return;
      seenSlugs.add(slug);

      const articleUrl = `${BASE_URL}/article/${encodeURIComponent(slug)}`;
      const lastmod = formatDate(article.updatedAt || article.publishedAt || article.createdAt);

      xml += `  <url>\n`;
      xml += `    <loc>${articleUrl}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml, 'utf8');
    console.log(`[SEO] sitemap.xml generated successfully at ${outputPath} with ${staticRoutes.length + seenSlugs.size} total URLs (${seenSlugs.size} article URLs).`);
  } catch (err) {
    console.error('[SEO] Error generating sitemap.xml:', err);
  }
}

generateSitemap();
