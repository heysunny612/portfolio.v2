import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { authState } from '../api/firebase/auth';
import { IUser } from '../interfaces/User';

interface UserContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  refreshUser: () => void;
}
const UserContext = createContext<UserContextProps | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);

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
