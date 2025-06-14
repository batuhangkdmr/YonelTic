export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { 'Content-Type': options.body ? 'application/json' : undefined }),
  };
  const response = await fetch(url, {
    ...options,
    headers,
  });
  return response;
} 