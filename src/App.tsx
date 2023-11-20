import { useEffect, useState } from "react";
import { UserAuth } from "./context/AuthContext";

import { Flex } from "@chakra-ui/react";
import { Summary } from "./components/Summary";
import { DisconnectedApp } from "./components/DisconnectedApp";
import { ConnectedAppHeader } from "./components/ConnectedApp/Header";
import { ConnectedAppTransactionList } from "./components/ConnectedApp/TransactionList";

function App() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  return (
    <main>
      <Flex flexDirection="column" padding="4" gap={4} minHeight="100vh">
        <Summary />
        <Flex flex="1">
          {loading ? (
            <p>Carregando...</p>
          ) : !user ? (
            <DisconnectedApp />
          ) : (
            <Flex flexDirection="column" gap={8} width="100%">
              <ConnectedAppHeader />
              <ConnectedAppTransactionList />
            </Flex>
          )}
        </Flex>
      </Flex>
    </main>
  );
}

export default App;
