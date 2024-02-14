import { Summary } from "./components/Summary";
import { ConnectedAppHeader } from "./components/header";
import { ConnectedAppTransactionList } from "./components/transaction-list";
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
      <main className="flex flex-col gap-8 p-4">
        <Summary />
        <ConnectedAppTransactionList />
      </main>
    </div>
  );
}

export default App;
