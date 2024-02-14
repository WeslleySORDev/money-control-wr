import { UserAuth } from "./context/AuthContext";

function App() {
  const { user } = UserAuth();
  return (
    <div className="flex flex-col">
      <header>header</header>
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
