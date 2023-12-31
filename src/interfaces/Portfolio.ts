import { Tag } from 'react-tag-input';

export interface IPortfolio {
  id?: string;
  title?: string;
  description?: Tag[];
  skills?: string[];
  buildAdress?: string;
  codeAdress?: string;
  images?: {
    index: number;
    imageURL: string | void;
  }[];
  createdAt?: number;
  likes?: {
    [uid: string]: {
      displayName: string | null;
      email: string | null;
      like: boolean;
      photoURL: string | null;
    };
  };
}
