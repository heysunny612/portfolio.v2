import { IWriter } from './User';

export interface IReply {
  id?: string; //Create 할때는 없는 데이터
  commentId: string;
  reply: string;
  createdAt: number;
  writer: IWriter;
}
