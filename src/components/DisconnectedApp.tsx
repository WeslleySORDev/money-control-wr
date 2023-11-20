import { Flex, Heading, Button } from "@chakra-ui/react";

import { UserAuth } from "../context/AuthContext";

export function DisconnectedApp() {
  const { handleSignIn } = UserAuth();
  return (
    <Flex flexDirection="column" gap={8} margin="auto">
      <Heading textUnderlineOffset="4" textDecoration="underline">
        Você esta deslogado, faça login para utilizar o app
      </Heading>
      <Button
        width="fit-content"
        marginInline="auto"
        onClick={handleSignIn}
        variant="solid"
        colorScheme="telegram"
      >
        Login com google
      </Button>
    </Flex>
  );
}
