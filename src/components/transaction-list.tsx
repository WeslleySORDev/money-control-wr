import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { useTransactions } from "../hooks/useTransactions";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useState } from "react";
import { TransactionType } from "@/@types/Transaction";
import { UserAuth } from "@/context/AuthContext";

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
        //   onClose();
      }
    } else {
      alert("Os campos Titulo e Categoria não podem estar vazios !");
    }
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger className="w-fit ml-auto" asChild>
            <Button variant="destructive">Nova transação</Button>
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
                    value={modalInputAmount}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="transaction-category" className="text-left">
                    Categoria (tamanho máximo 56 caracters)
                  </Label>
                  <Input id="transaction-category" value={modalInputCategory} />
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
              <Button variant="destructive" className="w-full" type="submit">
                Cadastrar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Button onClick={clearAllTransactions}>Limpar transações</Button>
      </div>
      {/* {transactions && transactions.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Título</Th>
                <Th>Valor</Th>
                <Th display={{base: 'none', lg: 'table-cell'}}>Categoria</Th>
                <Th display={{base: 'none', lg: 'table-cell'}}>Tipo</Th>
                <Th display={{base: 'none', lg: 'table-cell'}}>Data</Th>
                <Th isNumeric>Excluir</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => {
                return (
                  <Tr key={transaction.docId}>
                    <Td>{transaction.title}</Td>
                    <Td textColor={transaction.type === "Income" ? "rgba(18, 164, 84,0.6)" : "rgba(229, 46, 77, 0.6)"}>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(transaction.amount)}
                    </Td>
                    <Td display={{base: 'none', lg: 'table-cell'}}>{transaction.category}</Td>
                    <Td display={{base: 'none', lg: 'table-cell'}} bgColor={transaction.type === "Income" ? "rgba(18, 164, 84,0.6)" : "rgba(229, 46, 77, 0.6)"} textColor="white" textAlign="center">
                      {transaction.type === "Income" ? "Entrada" : "Retirada"}
                    </Td>
                    <Td display={{base: 'none', lg: 'table-cell'}}>
                      {new Intl.DateTimeFormat("pt-BR").format(
                        new Date(transaction.createdAt)
                      )}
                    </Td>
                    <Td isNumeric>
                      <IconButton
                        onClick={() => {
                          if (transaction.docId) {
                            if (
                              window.confirm(
                                "Deseja realmente apagar o item da lista?"
                              )
                            ) {
                              deleteTransaction(transaction.docId);
                            }
                          }
                        }}
                        icon={<DeleteIcon />}
                        aria-label="Deletar item"
                        variant="colorScheme='blue'
              aria-label='Search database'"
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Flex flex="1" alignItems="start" justifyContent="center">
          <Heading textAlign="center">
            Parece que você não tem nenhuma transação adicionada, que tal
            começar agora clicando em Nova Transação?
          </Heading>
        </Flex>
      )} */}
    </div>
  );
}
