import { DeleteIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Heading,
  Flex,
} from "@chakra-ui/react";

import { useTransactions } from "../../hooks/useTransactions";

export function ConnectedAppTransactionList() {
  const { transactions, deleteTransaction } = useTransactions();
  return (
    <>
      {transactions && transactions.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Título</Th>
                <Th>Valor</Th>
                <Th>Categoria</Th>
                <Th>Tipo</Th>
                <Th>Data</Th>
                <Th isNumeric>Excluir</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => {
                return (
                  <Tr key={transaction.docId}>
                    <Td>{transaction.title}</Td>
                    <Td>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(transaction.amount)}
                    </Td>
                    <Td>{transaction.category}</Td>
                    <Td>
                      {transaction.type === "Income" ? "Entrada" : "Retirada"}
                    </Td>
                    <Td>
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
      )}
    </>
  );
}
