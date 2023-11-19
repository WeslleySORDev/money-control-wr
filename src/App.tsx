import { useEffect, useState } from "react";
import { UserAuth } from "./context/AuthContext";

function App() {
  const { user, handleSignIn, handleSignOut } = UserAuth();
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
      {loading ? null : !user ? (
        <button onClick={handleSignIn}>Login com google</button>
      ) : (
        <>
          <p>
            Olá {user.displayName} {user.uid}
          </p>
          <button onClick={handleSignOut}>Deslogar</button>
        </>
      )}
    </main>
  );
}

export default App;
