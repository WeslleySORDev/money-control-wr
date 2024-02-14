import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";

import { useTransactions } from "../hooks/useTransactions";
import { useState } from "react";
import { TransactionType } from "@/@types/Transaction";
import { UserAuth } from "@/context/AuthContext";
import { Trash } from "lucide-react";

type ITransactionInput = Omit<TransactionType, "id" | "createdAt" | "ownerId">;

export function ConnectedAppTransactionList() {
  const { user } = UserAuth();
  const {
    transactions,
    deleteTransaction,
    createTransaction,
    clearAllTransactions,
  } = useTransactions();
  const [modalInputTitle, setModalInputTitle] = useState("");
  const [modalInputAmount, setModalInputAmount] = useState(0);
  const [modalInputCategory, setModalInputCategory] = useState("");
  const [modalSelectedType, setModalSelectedType] = useState<
    "Income" | "Outcome"
  >("Income");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modalInputTitle !== "" && modalInputCategory !== "") {
      if (user) {
        const newTransaction: ITransactionInput = {
          title: modalInputTitle,
          type: modalSelectedType,
          category: modalInputCategory,
          amount: modalInputAmount,
        };
        createTransaction(newTransaction);
        setModalInputTitle("");
        setModalInputAmount(0);
        setModalInputCategory("");
        setModalSelectedType("Income");
      }
    } else {
      alert("Os campos Titulo e Categoria não podem estar vazios !");
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger className="w-fit ml-auto" asChild>
            <Button disabled={!user} variant="destructive">
              Nova transação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Transação</DialogTitle>
              <DialogDescription>
                Crie uma nova transação com facilidade, abaixo
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => submitForm(e)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="transaction-title" className="text-left">
                    Título (tamanho máximo 56 caracters)
                  </Label>
                  <Input
                    id="transaction-title"
                    onChange={(e) => setModalInputTitle(e.currentTarget.value)}
                    value={modalInputTitle}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="transaction-amount" className="text-left">
                    Valor da transação
                  </Label>
                  <Input
                    type="number"
                    id="transaction-amount"
                    onChange={(e) =>
                      setModalInputAmount(parseInt(e.currentTarget.value))
                    }
                    value={modalInputAmount}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="transaction-category" className="text-left">
                    Categoria (tamanho máximo 56 caracters)
                  </Label>
                  <Input
                    id="transaction-category"
                    onChange={(e) =>
                      setModalInputCategory(e.currentTarget.value)
                    }
                    value={modalInputCategory}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    className={`flex-1 text-white hover:bg-[rgba(18,_164,_84,0.8)] ${
                      modalSelectedType === "Income"
                        ? "bg-[rgba(18,_164,_84,0.8)]"
                        : "bg-[rgba(18,_164,_84,0.3)]"
                    }`}
                    onClick={() => setModalSelectedType("Income")}
                  >
                    Entrada
                  </Button>
                  <Button
                    type="button"
                    className={`flex-1 text-white hover:bg-[rgba(229,_46,_77,_0.8)] ${
                      modalSelectedType === "Outcome"
                        ? "bg-[rgba(229,_46,_77,_0.8)]"
                        : "bg-[rgba(229,_46,_77,_0.3)]"
                    }`}
                    onClick={() => setModalSelectedType("Outcome")}
                  >
                    Saída
                  </Button>
                </div>
              </div>
              <DialogClose asChild>
                <Button variant="destructive" className="w-full" type="submit">
                  Cadastrar
                </Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          disabled={transactions.length <= 0 || !user}
          onClick={clearAllTransactions}
        >
          Limpar transações
        </Button>
      </div>
      {transactions && transactions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titulo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Excluir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.docId}>
                <TableCell>{transaction.title}</TableCell>
                <TableCell
                  className={`${
                    transaction.type === "Income"
                      ? "text-[rgba(18,_164,_84,1.5)]"
                      : "text-[rgba(229,_46,_77,_1.5)]"
                  }`}
                >
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.amount)}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell
                  className={`text-center font-semibold ${
                    transaction.type === "Income"
                      ? "bg-[rgba(18,_164,_84,0.3)]"
                      : "bg-[rgba(229,_46,_77,_0.3)]"
                  }`}
                >
                  {transaction.type === "Income" ? "Entrada" : "Retirada"}
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(transaction.createdAt)
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() =>
                      deleteTransaction(transaction.docId as string)
                    }
                    variant="ghost"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
