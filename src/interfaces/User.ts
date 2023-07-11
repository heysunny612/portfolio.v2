import { User } from 'firebase/auth';

export interface IUser extends User {
  isAdmin?: boolean;
  isBusinessUser?: boolean;
}

export interface IWriter {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}
