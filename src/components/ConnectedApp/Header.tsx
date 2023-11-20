import { Flex, Text, Button } from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";

export function ConnectedAppHeader() {
  const { user, handleSignOut } = UserAuth();
  return (
    <>
      {user ? (
        <Flex alignItems="center" gap={4} marginLeft="auto">
          <Text fontSize="large">Olá {user.displayName}</Text>
          <Button
            onClick={handleSignOut}
            variant="solid"
            colorScheme="telegram"
          >
            Deslogar
          </Button>
        </Flex>
      ) : null}
    </>
  );
}
