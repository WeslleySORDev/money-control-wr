import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";

import { UserAuth } from "../context/AuthContext";
import {
  TransactionFireStoreType,
  TransactionType,
} from "../@types/Transaction";

import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

type ITransactionInput = Omit<TransactionType, "id" | "createdAt" | "ownerId">;

interface ITransactionsProviderProps {
  children: ReactNode;
}

interface ITransactionsContextData {
  transactions: TransactionFireStoreType[];
  createTransaction(transactionInput: ITransactionInput): Promise<void>;
  deleteTransaction(docId: string): Promise<void>;
}

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const { user } = UserAuth();
  const [transactions, setTransactions] = useState<TransactionFireStoreType[]>(
    []
  );

  const getTransactionList = async () => {
    const transactionsRef = await getDocs(collection(db, "transactions"));
    var transactionList: TransactionFireStoreType[] = [];
    const docsFiltered = transactionsRef.docs.filter(
      (doc) => doc.data().ownerId === user?.uid
    );
    docsFiltered.map((doc) => {
      const { title, amount, category, type, createdAt, ownerId } = doc.data();
      const transaction: TransactionFireStoreType = {
        title: title,
        amount: amount,
        category: category,
        type: type,
        createdAt: createdAt,
        ownerId: ownerId,
        docId: doc.id,
      };
      transactionList.push(transaction);
    });
    return setTransactions(transactionList);
  };

  async function createTransaction(transactionInput: ITransactionInput) {
    const uid = user ? user.uid : "unknown";
    const newTransaction: TransactionType = {
      title: transactionInput.title,
      amount: transactionInput.amount,
      category: transactionInput.category,
      type: transactionInput.type,
      createdAt: new Date().getTime(),
      ownerId: uid,
    };

    if (user)
      try {
        await addDoc(collection(db, "transactions"), newTransaction);
      } catch (e) {
      } finally {
        const newTransactions: any = [...transactions, newTransaction];
        setTransactions(newTransactions);
      }
  }

  async function deleteTransaction(docId: string) {
    const indexOfTransaction = transactions.findIndex(
      (transaction) => transaction.docId === docId
    );
    let newTransactions = [...transactions];
    newTransactions.splice(indexOfTransaction, 1);
    const docRef = doc(db, "transactions", docId);
    const transactionDoc = await getDoc(docRef);
    if (transactionDoc.exists()) {
      await deleteDoc(docRef);
    } else {
      console.log("Documento não encontrado!");
    }
  }
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (user) {
        getTransactionList();
      } else {
        setTransactions([]);
      }
    };
    checkAuthentication();
  }, [user]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
