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
  refreshUser: () => void;
}
const UserContext = createContext<UserContextProps | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<IExtendedUser | null>(null);

  const refreshUser = () => {
    authState(setUser);
  };

  useEffect(() => {
    authState(setUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUserContext = (): UserContextProps | null =>
  useContext(UserContext);
