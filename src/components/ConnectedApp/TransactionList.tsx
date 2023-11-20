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
      )}
    </>
  );
}
