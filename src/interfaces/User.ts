import { User } from 'firebase/auth';

export interface IUser extends User {
  isAdmin?: boolean;
  isCompany?: boolean;
}
