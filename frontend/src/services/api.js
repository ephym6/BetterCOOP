/**
 * BetterCOOP - Full-Stack Client-Side Service Layer (Increment 1 & 2 Core System)
 * 
 * This service layer communicates directly with the real Node.js + Express backend
 * and mounts API queries under `/api/*`. It persists data securely in the backend
 * file-based database for durable session persistence.
 */

// Helper for standard JSON headers
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// Helper response handler
async function handleResponse(response) {
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || `API error: ${response.status}`);
  }
  const data = await response.json();
  if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
    return data.data;
  }
  return data;
}

export const membersService = {
  /**
   * GET /api/members
   * Returns list of cooperative members.
   */
  async getMembers() {
    const res = await fetch('/api/members', { headers: getHeaders() });
    return handleResponse(res);
  },

  /**
   * GET /api/members/:id
   * Returns a specific member.
   */
  async getMemberById(id) {
    try {
      const res = await fetch(`/api/members/${id}`, { headers: getHeaders() });
      return await handleResponse(res);
    } catch {
      return null;
    }
  },

  /**
   * POST /api/members
   * Onboards a brand new agricultural member and generates a unique ID.
   */
  async createMember(memberData) {
    const res = await fetch('/api/members', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(memberData),
    });
    return handleResponse(res);
  },

  /**
   * PUT /api/members/:id
   * Updates coordinates or operational crop types for an existing farmer.
   */
  async updateMember(id, updates) {
    const res = await fetch(`/api/members/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  }
};

export const usersService = {
  /**
   * GET /api/users
   * Returns system users/administrators.
   */
  async getUsers() {
    const res = await fetch('/api/users', { headers: getHeaders() });
    return handleResponse(res);
  },

  /**
   * POST /api/users
   * Invites or registers a system administrator/staff member.
   */
  async createUser(userData) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  /**
   * GET /api/users/me
   * Fetches active session user profile.
   */
  async getCurrentUser() {
    try {
      // First try to load backend active session
      const res = await fetch('/api/auth/me', { headers: getHeaders() });
      if (res.ok) {
        const u = await handleResponse(res);
        if (u) {
          localStorage.setItem('bettercoop_current_user', JSON.stringify(u));
          return u;
        }
      }
    } catch (e) {
      console.warn("Backend session fetch failed, falling back to local storage", e);
    }
    
    // Fallback to local storage if backend is transient
    const data = localStorage.getItem('bettercoop_current_user');
    return data ? JSON.parse(data) : null;
  },

  /**
   * PUT /api/users/me
   * Allows the administrator to update their email and display avatar.
   */
  async updateCurrentUser(updates) {
    const res = await fetch('/api/auth/me', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    const updated = await handleResponse(res);
    localStorage.setItem('bettercoop_current_user', JSON.stringify(updated));
    return updated;
  },

  /**
   * POST /api/users/login
   * Authenticates/sets active session user in the backend.
   */
  async loginUser(email) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: getHeaders(),
      // MOCK password as frontend only used email originally
      body: JSON.stringify({ email, password: 'password123' }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'API error');
    
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    const user = result.data || result;
    localStorage.setItem('bettercoop_current_user', JSON.stringify(user));
    return user;
  }
};

export const transactionsService = {
  /**
   * GET /api/transactions
   * Retrieves full transaction logs.
   */
  async getTransactions() {
    const res = await fetch('/api/transactions', { headers: getHeaders() });
    return handleResponse(res);
  },

  /**
   * POST /api/transactions
   * Logs a new financial or delivery record.
   */
  async createTransaction(txData) {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(txData),
    });
    return handleResponse(res);
  }
};

export const settingsService = {
  /**
   * GET /api/settings
   * Returns global system preferences, minimum share rules, and interest rates.
   */
  async getSettings() {
    const res = await fetch('/api/settings', { headers: getHeaders() });
    return handleResponse(res);
  },

  /**
   * PUT /api/settings
   * Saves updated limits and toggles.
   */
  async updateSettings(updates) {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(res);
  }
};
