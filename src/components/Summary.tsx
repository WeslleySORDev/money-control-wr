import { Flex, Text, Heading } from "@chakra-ui/react";

export function Summary() {
  return (
    <Flex flexDirection="row" gap={8}>
      <Flex flex="1" alignItems="start" direction="column" align="center" gap="24px" bgColor="rgb(40,42,45)" textColor="white" borderRadius="4px" padding="16px">
        <Text>Entradas</Text>
        <Heading>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(0)}
        </Heading>
      </Flex>
      <Flex flex="1" alignItems="start" direction="column" align="center" gap="24px" bgColor="rgb(40,42,45)" textColor="white" borderRadius="4px" padding="16px">
        <Text>Saídas</Text>
        <Heading>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(0)}
        </Heading>
      </Flex>
      <Flex flex="1" alignItems="start" direction="column" align="center" gap="24px" bgColor="rgb(51,204,149)" textColor="white" borderRadius="4px" padding="16px">
        <Text>Total</Text>
        <Heading>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(0)}
        </Heading>
      </Flex>
    </Flex>
  );
}
