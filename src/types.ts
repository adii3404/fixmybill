export type TransactionStatus = 'matched' | 'needs-bill' | 'verified';

export type ExpenseCategory = 'Shopping' | 'Health' | 'Dining' | 'Utilities' | 'Travel' | 'Groceries' | 'Entertainment';

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  category: ExpenseCategory;
  note?: string;
  hasAttachment?: boolean;
}

export type ModalType = 'camera' | 'upload' | 'manual' | 'signin' | 'trial' | 'demo' | null;

export interface MonthlyStats {
  totalSpent: number;
  billsSaved: number;
  needsReview: number;
}
