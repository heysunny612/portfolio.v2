import { IWriter } from './User';

export interface IComment {
  id?: number; //Create 할때는 없는 데이터
  commentData: IcommentData;
}

interface IcommentData {
  pageId: string;
  comment: string;
  createdAt: number;
  writer: IWriter;
}
