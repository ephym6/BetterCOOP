/**
 * BetterCOOP - TypeScript Interface Declarations
 * These structures align directly with intended MongoDB/Mongoose schemas for future API integration.
 */

export interface Member {
  _id: string; // future MongoDB ObjectId string mapping
  memberId: string; // e.g., "BC-2024-001"
  fullName: string;
  nationalId: string;
  phoneNumber: string;
  email?: string;
  cropType: string; // e.g., "Maize", "Rice", "Coffee", "Cocoa"
  farmSize: number; // in Hectares
  farmType: 'Smallholder' | 'Commercial';
  shareCapital: number; // in Ksh
  status: 'ACTIVE' | 'PROBATION' | 'INACTIVE' | 'SUSPENDED';
  joinedDate: string; // ISO string or short date "Jan 2024"
  avatarUrl?: string;
  // future fields
  savingsBalance?: number;
  loanCount?: number;
}

export interface User {
  _id: string;
  email: string;
  fullName: string;
  role: 'SUPER_ADMIN' | 'COOP_ADMIN' | 'SENIOR_OFFICER' | 'FIELD_AGENT';
  status: 'ACTIVE' | 'SUSPENDED';
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface Transaction {
  _id: string;
  memberId: string;
  memberName: string;
  memberAvatar?: string;
  type: string;
  date: string; // e.g. "Oct 24, 2023"
  amount?: number; // in Ksh
  weightKg?: number; // in Kg for produce delivery
  status: 'COMPLETED' | 'PROCESSING' | 'FAILED';
  reference?: string;
}

export interface SystemSettings {
  cooperativeName: string;
  taxRegistrationNumber: string;
  currency: string;
  minimumShareCapital: number;
  interestRateSavingsDecimal: number;
  interestRateLoansDecimal: number;
  enableSmsNotifications: boolean;
  enableTwoFactorAuth: boolean;
}
