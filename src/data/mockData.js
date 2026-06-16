import { Member, User, Transaction, SystemSettings } from '../types';

export const INITIAL_MEMBERS: Member[] = [
  {
    _id: 'mem_1',
    memberId: '#BC-2024-001',
    fullName: 'Juan Dela Cruz',
    nationalId: '12345678',
    phoneNumber: '+63 917 123 4567',
    cropType: 'Rice',
    farmSize: 4.2,
    farmType: 'Smallholder',
    shareCapital: 45000,
    status: 'ACTIVE',
    joinedDate: 'Joined Jan 2024',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKnLyza3WkUC1-tmN7VohPVjnXBU2O1MnGLOEWq14C4ynklbBJYassYPXxyyPTK6v6MoXMpWUJpvHORPzArxHYzP6wew9DXCQboviLnx7AjrGq0eozDftLNRVHzZpKFBo8414jjj-Iqw_gOj55aCWiHqG2bjQK4-Yp_6D6t557m3P0FeIvA_QEfxAuNtSkM-fdjOoiBvFOSICxbzgESj2CA812YF7FxinwwwsKcG7KmnNPQ4Zjkd4EaxKPzgJCmzblLYLQZJdRFg8'
  },
  {
    _id: 'mem_2',
    memberId: '#BC-2024-002',
    fullName: 'Maria Santos',
    nationalId: '87654321',
    phoneNumber: '+63 918 234 5678',
    cropType: 'Coconut',
    farmSize: 3.5,
    farmType: 'Smallholder',
    shareCapital: 12500,
    status: 'PROBATION',
    joinedDate: 'Joined Feb 2024',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDOu8LkTRGZruwlgLBm1zFbMzppCxm8YWhaE0gXjr7GoGdPGr6wgvp2dynSoS2QY-A9V1JjyseeQ0sWLUuaLauvzos4HKTSOXEyG55cVst9nxvRg1_tskWOivX1ucw6df3doxoOxj8n0Zca802-Fo0n6qauP2K0l0Soj38O1SQrN_BERKfYDdeZHZy7pn6uk0z-HqVZROgIhqejlz55xr9Qbm-3q1-NUuPWTtgGc5vERO8h3RZ23dzzpKQGYEYx4ZCNT9h49vZbJ4'
  },
  {
    _id: 'mem_3',
    memberId: '#BC-2023-994',
    fullName: 'Ricardo Puno',
    nationalId: '45678901',
    phoneNumber: '+63 919 345 6789',
    cropType: 'Corn',
    farmSize: 8.0,
    farmType: 'Commercial',
    shareCapital: 128400,
    status: 'ACTIVE',
    joinedDate: 'Joined Nov 2023',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwippMDq5kzLUjqo33v4t2fHYVU23Qzrs101T2ZKKkB3PiJObjS_IglGYY3JxCDvt5-MOFvuU_VGKFQmlISjwG0hzSjplms5sIHl7fQIcUyXOd5G-4W8511RDdtny-oU90AQasLGJCv2ozJ2KoJYdPaaLxfSBSl-T0wRL3R0M1Sg3rP7ptreMkIidDpgo8aFbvxBJrsse95iWbMvCsc3G66cZnCHhpkZ1UDlQgXjo62uflU1pmMU0aJKkLvD3TmHmc7p1muiLGQR0'
  },
  {
    _id: 'mem_4',
    memberId: '#BC-2023-841',
    fullName: 'Elena Abad',
    nationalId: '23456789',
    phoneNumber: '+63 920 456 7890',
    cropType: 'Sugar Cane',
    farmSize: 2.1,
    farmType: 'Smallholder',
    shareCapital: 5000,
    status: 'INACTIVE',
    joinedDate: 'Joined Aug 2023',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB21ysuYWMEcQCeHOa4e9BNKrqaLdSAsMf1lN26k1LoMpb1aCx9UKG_C2G8Fa8QMFyExHc-VSikudo9BuvpMeaK7xZSD-Hc0PW0_f8mGhOXRC2W1ekcx9CAN4yKMp0jpyvOYRTwkAjYE0IiyQWWTaw-xLA1zr8_WH3bDv1C1AU3raaJjItmxFgq8s4Sk0kf8C6VhE22WWFGycUXkvS72R-jzM9-klO6ZoiYf8rLIWvbMfUwWodwif294o0JgkmiaZ5OFjWQJHAfyKk'
  },
  {
    _id: 'mem_5',
    memberId: '#BC-2024-045',
    fullName: 'Fernando Lopez',
    nationalId: '90123456',
    phoneNumber: '+63 921 567 8901',
    cropType: 'Rice',
    farmSize: 5.5,
    farmType: 'Commercial',
    shareCapital: 32000,
    status: 'ACTIVE',
    joinedDate: 'Joined Mar 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    _id: 'mem_6',
    memberId: '#BC-9923',
    fullName: 'Adebayo Olatunji',
    nationalId: '11223344',
    phoneNumber: '+254 711 223 344',
    cropType: 'Cassava',
    farmSize: 4.8,
    farmType: 'Smallholder',
    shareCapital: 25000,
    status: 'ACTIVE',
    joinedDate: 'Joined Jul 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    _id: 'mem_7',
    memberId: '#BC-8812',
    fullName: 'Chidi Eze',
    nationalId: '44332211',
    phoneNumber: '+254 722 334 455',
    cropType: 'Cassava',
    farmSize: 6.2,
    farmType: 'Commercial',
    shareCapital: 15400,
    status: 'ACTIVE',
    joinedDate: 'Joined Oct 2022',
  },
  {
    _id: 'mem_8',
    memberId: '#BC-4451',
    fullName: 'Fatima Abubakar',
    nationalId: '99887766',
    phoneNumber: '+254 733 445 566',
    cropType: 'Cocoa',
    farmSize: 1.8,
    farmType: 'Smallholder',
    shareCapital: 18000,
    status: 'ACTIVE',
    joinedDate: 'Joined Dec 2022',
  },
  {
    _id: 'mem_9',
    memberId: '#BC-99021',
    fullName: 'Ezekiel Kemboi',
    nationalId: '25411033',
    phoneNumber: '+254 744 123 456',
    cropType: 'Maize',
    farmSize: 3.2,
    farmType: 'Smallholder',
    shareCapital: 45000,
    status: 'PROBATION',
    joinedDate: 'Joined Apr 2024'
  },
  {
    _id: 'mem_10',
    memberId: '#BC-88124',
    fullName: 'Amina Hassan',
    nationalId: '44521098',
    phoneNumber: '+254 755 987 654',
    cropType: 'Coffee',
    farmSize: 12.0,
    farmType: 'Commercial',
    shareCapital: 220000,
    status: 'ACTIVE',
    joinedDate: 'Joined Sep 2021',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB21ysuYWMEcQCeHOa4e9BNKrqaLdSAsMf1lN26k1LoMpb1aCx9UKG_C2G8Fa8QMFyExHc-VSikudo9BuvpMeaK7xZSD-Hc0PW0_f8mGhOXRC2W1ekcx9CAN4yKMp0jpyvOYRTwkAjYE0IiyQWWTaw-xLA1zr8_WH3bDv1C1AU3raaJjItmxFgq8s4Sk0kf8C6VhE22WWFGycUXkvS72R-jzM9-klO6ZoiYf8rLIWvbMfUwWodwif294o0JgkmiaZ5OFjWQJHAfyKk'
  },
  {
    _id: 'mem_11',
    memberId: '#BC-77219',
    fullName: 'James Omondi',
    nationalId: '77219124',
    phoneNumber: '+254 766 543 210',
    cropType: 'Maize',
    farmSize: 6.4,
    farmType: 'Commercial',
    shareCapital: 150000,
    status: 'ACTIVE',
    joinedDate: 'Joined May 2023'
  },
  {
    _id: 'mem_12',
    memberId: '#BC-99055',
    fullName: 'Sarah Njeri',
    nationalId: '99055123',
    phoneNumber: '+254 777 111 222',
    cropType: 'Cocoa',
    farmSize: 2.8,
    farmType: 'Smallholder',
    shareCapital: 85000,
    status: 'PROBATION',
    joinedDate: 'Joined Jan 2024'
  }
];

export const INITIAL_USERS: User[] = [
  {
    _id: 'usr_1',
    email: 'admin@bettercoop.agri',
    fullName: 'Admin User',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSDCgHgbvEqwyKRX_GQ4SmKJanH_ltHZndj95PmLgPnzpBeWDecA-QayX-06MVxTrDmzU_wVnzFd_nqdLLoqHy65imHcEGqOad8VHRTeL3LnR3z7NRB4PL3DQI1PyVNYTMHBugU-s1tyhghPa6AuBRBkl3NKD3vrIRuRWN6M6HMJNq9RXpBPYAbOkVR_vTDI4oV1yU35In_ZrDWIjX3YhfjwVflMo2ApteSTsUlFFNrAGFqJOSdkWFNqTPtUqFeJ9O9dZ_4jEhiCw'
  },
  {
    _id: 'usr_2',
    email: 'sarah.miller@bettercoop.agri',
    fullName: 'Sarah Miller',
    role: 'COOP_ADMIN',
    status: 'ACTIVE',
    phoneNumber: '+254 799 111 222',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8IFvNdwUGbDubGYZvceYNTfcTYraCl4XWd2vM2MuM24yGSgLzvOxxHGoI_AQOGzskgktsODmTfr9b4k4th_VRJxA-6PLznzztQTwRIWPQVNwzgIlz6wPYDOncaGo3uecq--Zb1Rs0L804cqUtckzUeTcT8NGKHK41bEunx4WoqmYxzxE6i5SyhmwFAY-BTJ6S-XgRs1r8GFIFNh33dV0a3hMc38-2vp_SIvtgGqR2HSWsEzjoZ46UQPjWhGYCKf91uDteuS16fCE'
  },
  {
    _id: 'usr_3',
    email: 'samuel.mwangi@bettercoop.agri',
    fullName: 'Samuel Mwangi',
    role: 'SENIOR_OFFICER',
    status: 'ACTIVE',
    phoneNumber: '+254 799 333 444',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9xidyFynYQyfvxno26m3msfVpI7Uabhhislals9djtk-PSVzigZbkAQsPvt1haKxvB1Y-S0HdpI8lY2i81VbIXJPkX_SebVOSiIGu1ZaJ7n5tFYBdCx-GucscmW2dANfO3f2WvaO1Xcnr3yK_PXoT0Ga-NFZ1KMMspogjQAdUCqELW39v_Fzkq51gGmE3BIFKFQveAysjnvMpnXG5aKuAl0Y-A4cCdgRg8Q3y6CobxOFkUiOUxI5JEQvqHTX8TOrCaloudfX181o'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    _id: 'tx_1',
    memberId: '#BC-9923',
    memberName: 'Adebayo Olatunji',
    type: 'Loan Repayment',
    date: 'Oct 24, 2023',
    amount: 25000,
    status: 'COMPLETED',
    reference: 'Direct Pay'
  },
  {
    _id: 'tx_2',
    memberId: '#BC-8812',
    memberName: 'Chidi Eze',
    type: 'Cassava Delivery',
    date: 'Oct 24, 2023',
    weightKg: 450,
    status: 'PROCESSING',
    reference: 'Log #CA-904'
  },
  {
    _id: 'tx_3',
    memberId: '#BC-4451',
    memberName: 'Fatima Abubakar',
    type: 'Savings Deposit',
    date: 'Oct 23, 2023',
    amount: 5000,
    status: 'COMPLETED',
    reference: 'Mobile Money'
  },
  {
    _id: 'tx_4',
    memberId: '#MBR-90210',
    memberName: 'John Okoro',
    type: 'Savings Deposit',
    date: 'Oct 24, 2023',
    amount: 25000,
    status: 'COMPLETED',
    reference: 'Monthly contribution'
  },
  {
    _id: 'tx_5',
    memberId: '#MBR-44123',
    memberName: 'Amina Bello',
    type: 'Savings Deposit',
    date: 'Oct 24, 2023',
    amount: -15000, // Denotes Withdrawal
    status: 'COMPLETED',
    reference: 'Emergency withdrawal'
  },
  {
    _id: 'tx_6',
    memberId: '#MBR-77291',
    memberName: 'Samuel Musa',
    type: 'Loan Repayment',
    date: 'Oct 23, 2023',
    amount: 42500,
    status: 'PROCESSING',
    reference: 'Seed Purchase Loan Repayment'
  },
  {
    _id: 'tx_7',
    memberId: '#MBR-12204',
    memberName: 'Chidi Ike',
    type: 'Initial Deposit',
    date: 'Oct 23, 2023',
    amount: 10000,
    status: 'COMPLETED',
    reference: 'Initial savings deposit'
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  cooperativeName: 'BetterCOOP Agricultural Union',
  taxRegistrationNumber: 'KRA-PIN-COOP9901Z',
  currency: 'Ksh',
  minimumShareCapital: 5000,
  interestRateSavingsDecimal: 0.145, // 14.5% Active APY
  interestRateLoansDecimal: 0.045, // 4.5% default loan
  enableSmsNotifications: true,
  enableTwoFactorAuth: true
};
