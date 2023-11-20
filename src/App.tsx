import { UserAuth } from "./context/AuthContext";

import { Flex } from "@chakra-ui/react";
import { Summary } from "./components/Summary";
import { DisconnectedApp } from "./components/DisconnectedApp";
import { ConnectedAppHeader } from "./components/ConnectedApp/Header";
import { ConnectedAppTransactionList } from "./components/ConnectedApp/TransactionList";

function App() {
  const { user } = UserAuth();
  return (
    <main>
      <Flex flexDirection="column" padding={["0", "0", "0", "4"]} gap={4} minHeight="100vh">
        <Summary />
        {/* <Flex flex="1">
          {!user ? (
            <DisconnectedApp />
          ) : (
            <Flex flexDirection="column" gap={8} width="100%">
              <ConnectedAppHeader />
              <ConnectedAppTransactionList />
            </Flex>
          )}
        </Flex> */}
      </Flex>
    </main>
  );
}

export default App;
