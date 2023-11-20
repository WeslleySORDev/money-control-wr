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
} from "@chakra-ui/react";

export function ConnectedAppTransactionList() {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Valor</Th>
            <Th>Categoria</Th>
            <Th>Data</Th>
            <Th isNumeric>Excluir</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Teste</Td>
            <Td>500</Td>
            <Td>Casa</Td>
            <Td>25/25</Td>
            <Td isNumeric>
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Deletar item"
                variant="colorScheme='blue'
                aria-label='Search database'"
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
