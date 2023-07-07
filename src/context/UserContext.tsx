import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { authState } from '../api/firebase/auth';
import { IExtendedUser } from '../interfaces/User';

interface UserContextProps {
  user: IExtendedUser | null;
  setUser: React.Dispatch<React.SetStateAction<IExtendedUser | null>>;
}
const UserContext = createContext<UserContextProps | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<IExtendedUser | null>(null);
  useEffect(() => {
    authState(setUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUserContext = (): UserContextProps | null =>
  useContext(UserContext);
