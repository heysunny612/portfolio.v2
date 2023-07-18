import { IPortfolio } from './Portfolio';
import { IWriter } from './User';

export interface IComment {
  id?: string; //Create 할때는 없는 데이터
  pageId?: string;
  commentId?: string;
  comment: string;
  createdAt: number;
  writer: IWriter;
}

export interface IMyComment extends IPortfolio {
  comment?: IComment[];
}
