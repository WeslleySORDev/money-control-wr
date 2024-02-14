import { ConnectedAppHeader } from "./components/header";
import { Button } from "./components/ui/button";
import { UserAuth } from "./context/AuthContext";

import { Banknote } from "lucide-react";

function App() {
  const { user, handleSignIn } = UserAuth();
  return (
    <div className="flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-b-[rgba(39,_39,_42,_0.4)]">
        <div className="flex items-center space-x-4 select-none">
          <Banknote width={64} height={64} color="green" />
          <h1 className="text-2xl">Money Control</h1>
        </div>

        {!user ? (
          <div className="flex items-center space-x-4 ml-auto">
            <span>Você não está logado, faça login com o google</span>
            <Button onClick={handleSignIn}>Google Login</Button>
          </div>
        ) : (
          <ConnectedAppHeader />
        )}
      </header>
      <main>
        {/* <Flex flexDirection="column" padding={["0", "0", "0", "4"]} gap={4} minHeight="100vh">
        <Summary />
        <Flex flex="1">
          {!user ? (
            <DisconnectedApp />
          ) : (
            <Flex flexDirection="column" gap={8} width="100%">
              <ConnectedAppHeader />
              <ConnectedAppTransactionList />
            </Flex>
          )}
        </Flex>
      </Flex> */}
      </main>
    </div>
  );
}

export default App;
