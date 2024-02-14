import { UserAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

export function ConnectedAppHeader() {
  const { user, handleSignOut } = UserAuth();
  return (
    <>
      <div className="flex items-center space-x-4 ml-auto">
        <span>Olá {user?.displayName}</span>
        <div className="flex gap-4">
          <Button onClick={handleSignOut}>Deslogar</Button>
        </div>
      </div>
    </>
  );
}
