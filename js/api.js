const API_BASE = (typeof window !== 'undefined' && window.CUTE_TODO_API_BASE) || 'http://localhost:4000';

async function apiRequest(path, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
  
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      let data;
      try { data = await res.json(); } catch { /* ignore */ }
      const message = (data && (data.error || data.message)) || `HTTP ${res.status}`;
      throw new Error(message);
    }
    if (res.status === 204) return null;
    return res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.warn('API request timeout:', path);
      throw new Error('Request timeout');
    }
    console.warn('API request failed:', path, err.message);
    throw err;
  }
}
const TasksAPI = {
  list: () => apiRequest('/api/tasks'),
  create: (payload) => apiRequest('/api/tasks', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => apiRequest(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => apiRequest(`/api/tasks/${id}`, { method: 'DELETE' }),
  // 分离的API接口
  getToday: () => apiRequest('/api/tasks/today'),
  getHistory: (showCompleted = false) => apiRequest(`/api/tasks/history?showCompleted=${showCompleted}`)
};

const ThemeAPI = {
  get: () => apiRequest('/api/theme'),
  set: (theme) => apiRequest('/api/theme', { method: 'PUT', body: JSON.stringify({ theme }) })
};

const PremiumAPI = {
  status: () => apiRequest('/api/premium'),
  checkout: () => apiRequest('/api/premium/checkout', { method: 'POST' })
};

if (typeof window !== 'undefined') {
  window.CuteToDoAPI = { TasksAPI, ThemeAPI, PremiumAPI, apiRequest };
}
