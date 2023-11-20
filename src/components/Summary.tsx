import { Flex, Text, Heading } from "@chakra-ui/react";
import { useTransactions } from "../hooks/useTransactions";

export function Summary() {
  const { transactions } = useTransactions();
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "Income") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );
  return (
    <Flex flexDirection="row" gap={8}>
      <Flex
        flex="1"
        alignItems="start"
        direction="column"
        align="center"
        gap="24px"
        bgColor="rgb(40,42,45)"
        textColor="white"
        borderRadius="4px"
        padding="16px"
      >
        <Text>Entradas</Text>
        <Heading>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.deposits)}
        </Heading>
      </Flex>
      <Flex
        flex="1"
        alignItems="start"
        direction="column"
        align="center"
        gap="24px"
        bgColor="rgb(40,42,45)"
        textColor="white"
        borderRadius="4px"
        padding="16px"
      >
        <Text>Saídas</Text>
        <Heading>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.withdraws)}
        </Heading>
      </Flex>
      <Flex
        flex="1"
        alignItems="start"
        direction="column"
        align="center"
        gap="24px"
        bgColor={summary.total > 0 ? "rgb(51,204,149)" : "rgba(229, 46, 77, 0.6)"}
        textColor="white"
        borderRadius="4px"
        padding="16px"
      >
        <Text>Total</Text>
        <Heading>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </Heading>
      </Flex>
    </Flex>
  );
}
