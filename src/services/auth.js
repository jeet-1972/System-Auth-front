const API_BASE = import.meta.env.VITE_API_URL || '';

const json = (body) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
  credentials: 'include',
});

export async function register({ username, email, phone, password }) {
  const res = await fetch(`${API_BASE}/api/register`, json({ username, email, phone, password }));
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export async function login({ username, password }) {
  const res = await fetch(`${API_BASE}/api/login`, json({ username, password }));
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export async function logout() {
  const res = await fetch(`${API_BASE}/api/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export async function me() {
  const res = await fetch(`${API_BASE}/api/me`, { credentials: 'include' });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}
