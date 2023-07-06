import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { authState } from '../api/firebase';
import { IUser } from '../interfaces/User';

interface UserContextProps {
  user: IUser | null;
}
const UserContext = createContext<UserContextProps | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => authState(setUser), []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
export const useUserContext = (): UserContextProps | null =>
  useContext(UserContext);
