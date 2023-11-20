import { Flex, Heading, Button } from "@chakra-ui/react";

import { UserAuth } from "../context/AuthContext";

export function DisconnectedApp() {
  const { handleSignIn } = UserAuth();
  return (
    <Flex flexDirection="column" gap={8} margin="auto">
      <Heading fontSize={{base: "large", sm: "x-large", lg: "xx-large"}} textUnderlineOffset="4" textDecoration="underline" textAlign="center">
        Você esta deslogado, faça login para utilizar o app
      </Heading>
      <Button
        width="fit-content"
        marginInline="auto"
        onClick={handleSignIn}
        variant="solid"
        colorScheme="telegram"
        fontSize={{base: "small", md: "medium", lg: "large"}}
      >
        Login com google
      </Button>
    </Flex>
  );
}
