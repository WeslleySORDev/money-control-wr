export type TransactionType = {
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: number;
  ownerId: string;
};

export type TransactionFireStoreType = {
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: number;
  ownerId: string;
  docId?: string;
};
