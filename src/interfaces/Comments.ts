import { IWriter } from './User';

export interface IComment {
  id?: string; //Create 할때는 없는 데이터
  pageId: string;
  comment: string;
  createdAt: number;
  writer: IWriter;
}
