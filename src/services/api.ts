/**
 * BetterCOOP - Client-Side Service Layer (Increment 1 Core System)
 * 
 * DESIGNED FOR FUTURE REST API INTEGRATION:
 * The functions below simulate asynchronous database access by returning Promises.
 * 
 * FUTURE SERVER ARCHITECTURE:
 * - Express Server: Express.js (v4/v5) mounting routes under `/api/*`
 * - Database: MongoDB with Mongoose Schema mapper
 * 
 * Commented guides accompany each function to show the corresponding backend routes.
 */

import { Member, User, Transaction, SystemSettings } from '../types';
import { INITIAL_MEMBERS, INITIAL_USERS, INITIAL_TRANSACTIONS, INITIAL_SETTINGS } from '../data/mockData';

// Helper to initialize localStorage with mock data if not already present
function initDb() {
  if (!localStorage.getItem('bettercoop_members')) {
    localStorage.setItem('bettercoop_members', JSON.stringify(INITIAL_MEMBERS));
  }
  if (!localStorage.getItem('bettercoop_users')) {
    localStorage.setItem('bettercoop_users', JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem('bettercoop_transactions')) {
    localStorage.setItem('bettercoop_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
  }
  if (!localStorage.getItem('bettercoop_settings')) {
    localStorage.setItem('bettercoop_settings', JSON.stringify(INITIAL_SETTINGS));
  }
  if (!localStorage.getItem('bettercoop_current_user')) {
    // Default logged in user for prototype
    localStorage.setItem('bettercoop_current_user', JSON.stringify(INITIAL_USERS[0]));
  }
}

// Ingest baseline data
initDb();

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const membersService = {
  /**
   * GET /api/members
   * Returns list of cooperative members. Supports basic query filtering.
   */
  async getMembers(): Promise<Member[]> {
    await delay();
    const data = localStorage.getItem('bettercoop_members');
    return data ? JSON.parse(data) : [];
  },

  /**
   * GET /api/members/:id
   * Returns a specific member of the agricultural syndicate.
   */
  async getMemberById(id: string): Promise<Member | null> {
    await delay();
    const list = await this.getMembers();
    return list.find((m) => m._id === id || m.memberId === id) || null;
  },

  /**
   * POST /api/members
   * Onboards a brand new agricultural member and generates a unique ID.
   */
  async createMember(memberData: Omit<Member, '_id' | 'memberId' | 'joinedDate'>): Promise<Member> {
    await delay(600);
    const list = await this.getMembers();
    
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const mockId = `mem_${Date.now()}`;
    const newMemberId = `#BC-2026-${randomSuffix}`;

    const newMember: Member = {
      ...memberData,
      _id: mockId,
      memberId: newMemberId,
      joinedDate: `Joined Jun 2026`
    };

    list.unshift(newMember);
    localStorage.setItem('bettercoop_members', JSON.stringify(list));
    
    // Auto-generate an initial transaction log
    if (newMember.shareCapital > 0) {
      await transactionsService.createTransaction({
        memberId: newMemberId,
        memberName: newMember.fullName,
        type: 'Initial Deposit',
        amount: newMember.shareCapital,
        status: 'COMPLETED',
        reference: 'Initial Share Capital onboarding'
      });
    }

    return newMember;
  },

  /**
   * PUT /api/members/:id
   * Updates coordinates or operational crop types for an existing farmer.
   */
  async updateMember(id: string, updates: Partial<Member>): Promise<Member> {
    await delay();
    const list = await this.getMembers();
    const index = list.findIndex((m) => m._id === id);
    if (index === -1) throw new Error('Member not found');

    const updated = { ...list[index], ...updates };
    list[index] = updated;
    localStorage.setItem('bettercoop_members', JSON.stringify(list));
    return updated;
  }
};

export const usersService = {
  /**
   * GET /api/users
   * Returns system users/administrators.
   */
  async getUsers(): Promise<User[]> {
    await delay();
    const data = localStorage.getItem('bettercoop_users');
    return data ? JSON.parse(data) : [];
  },

  /**
   * POST /api/users
   * Invites or registers a system administrator/staff member.
   */
  async createUser(userData: Omit<User, '_id'>): Promise<User> {
    await delay();
    const list = await this.getUsers();
    const newUser: User = {
      ...userData,
      _id: `usr_${Date.now()}`
    };
    list.push(newUser);
    localStorage.setItem('bettercoop_users', JSON.stringify(list));
    return newUser;
  },

  /**
   * GET /api/users/me
   * Fetches active session user profile.
   */
  async getCurrentUser(): Promise<User | null> {
    const data = localStorage.getItem('bettercoop_current_user');
    return data ? JSON.parse(data) : null;
  },

  /**
   * PUT /api/users/me
   * Allows the administrator to update their email and display avatar.
   */
  async updateCurrentUser(updates: Partial<User>): Promise<User> {
    await delay(300);
    const current = await this.getCurrentUser();
    if (!current) throw new Error('No active session user');
    
    const updated = { ...current, ...updates };
    localStorage.setItem('bettercoop_current_user', JSON.stringify(updated));

    // Keep users directory in sync
    const list = await this.getUsers();
    const idx = list.findIndex((u) => u._id === current._id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      localStorage.setItem('bettercoop_users', JSON.stringify(list));
    }

    return updated;
  }
};

export const transactionsService = {
  /**
   * GET /api/transactions
   * Retrieves full transaction logs (deliveries, repayments, deposits).
   */
  async getTransactions(): Promise<Transaction[]> {
    await delay(200);
    const data = localStorage.getItem('bettercoop_transactions');
    return data ? JSON.parse(data) : [];
  },

  /**
   * POST /api/transactions
   * Logs a new financial record.
   */
  async createTransaction(txData: Omit<Transaction, '_id' | 'date'>): Promise<Transaction> {
    await delay(300);
    const list = await this.getTransactions();
    const newTx: Transaction = {
      ...txData,
      _id: `tx_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    list.unshift(newTx);
    localStorage.setItem('bettercoop_transactions', JSON.stringify(list));
    return newTx;
  }
};

export const settingsService = {
  /**
   * GET /api/settings
   * Returns global system preferences, minimum share rules, and interest rates.
   */
  async getSettings(): Promise<SystemSettings> {
    await delay();
    const data = localStorage.getItem('bettercoop_settings');
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  },

  /**
   * PUT /api/settings
   * Saves updated limits and toggles.
   */
  async updateSettings(updates: Partial<SystemSettings>): Promise<SystemSettings> {
    await delay(500);
    const current = await this.getSettings();
    const updated = { ...current, ...updates };
    localStorage.setItem('bettercoop_settings', JSON.stringify(updated));
    return updated;
  }
};
