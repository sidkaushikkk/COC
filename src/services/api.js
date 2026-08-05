const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export async function fetchArticles() {
  try {
    const res = await fetch(`${API_BASE}/api/articles`);
    if (!res.ok) throw new Error('Failed to fetch articles');
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error fetching articles from backend API:', err);
    return [];
  }
}

export async function fetchArticleBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/api/articles/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error('Failed to fetch article');
    const data = await res.json();
    return data.data || null;
  } catch (err) {
    console.error(`Error fetching article "${slug}" from API:`, err);
    return null;
  }
}

export async function fetchArticlesByCategory(category) {
  try {
    const res = await fetch(`${API_BASE}/api/articles/category/${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Failed to fetch articles by category');
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error(`Error fetching category "${category}" from API:`, err);
    return [];
  }
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_BASE}/api/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Subscription failed');
  }
  return data;
}

export async function submitContactForm(formData) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Submission failed');
  }
  return data;
}

export async function submitContributorArticle(payload) {
  const isFormData = payload instanceof FormData;
  const res = await fetch(`${API_BASE}/api/submit-article`, {
    method: 'POST',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? payload : JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Submission failed');
  }
  return data;
}
