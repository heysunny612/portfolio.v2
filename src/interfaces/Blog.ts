import { IWriter } from './User';
import { Tag } from 'react-tag-input';

export interface IBlog {
  id?: string;
  title: string;
  blogTags: Tag[];
  category: string;
  content: string;
  createdAt: number;
  thumbnail: string;
  writer: IWriter;
}
