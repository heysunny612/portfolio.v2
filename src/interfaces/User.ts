import { User } from 'firebase/auth';

export interface IExtendedUser extends User {
  company?: ICompany | null;
}

interface ICompany {
  id: string | undefined;
  companyName: string;
  uid: string;
}
