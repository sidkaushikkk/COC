import { useEffect } from 'react';

const DEFAULT_BASE_URL = 'https://childrenofcapital.com';
const DEFAULT_SITE_NAME = 'Children of Capital';
const DEFAULT_IMAGE = `${DEFAULT_BASE_URL}/TheMenu.jpg`;
const DEFAULT_DESCRIPTION = 'A premium digital magazine dissecting politics, economics, capital structures, and power. Clear-eyed essays and analytical dispatches by Anviksha Singh.';

function setMetaTag(selector, attrName, attrValue, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function setJsonLdScript(data) {
  let script = document.getElementById('seo-json-ld');
  if (!data) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', 'seo-json-ld');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
  jsonLd = null
}) {
  useEffect(() => {
    const finalTitle = title ? `${title}` : `${DEFAULT_SITE_NAME} | Systems, Wealth, and Power`;
    const finalDescription = description || DEFAULT_DESCRIPTION;
    const finalImage = image ? (image.startsWith('http') ? image : `${DEFAULT_BASE_URL}/${image.replace(/^\//, '')}`) : DEFAULT_IMAGE;
    
    let currentPath = window.location.hash || '#/';
    const finalCanonical = canonical || `${DEFAULT_BASE_URL}/${currentPath}`;

    // Title
    document.title = finalTitle;

    // Standard Meta
    setMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
    setMetaTag('meta[name="title"]', 'name', 'title', finalTitle);
    setMetaTag('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical Link
    setLinkTag('canonical', finalCanonical);

    // Open Graph
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', DEFAULT_SITE_NAME);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', finalCanonical);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalImage);

    // Twitter Card
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', finalImage);

    // JSON-LD Structured Data
    setJsonLdScript(jsonLd);
  }, [title, description, canonical, image, type, noindex, jsonLd]);

  return null;
}
