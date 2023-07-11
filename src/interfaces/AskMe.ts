import { IWriter } from './User';

export interface IAskMe {
  id?: string;
  writer: IWriter;
  question: string;
  isPublic: boolean;
  createAt: number;
  answer?: IAnswer;
}

export interface IAnswer {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  content: string;
  createAt: number;
}

export interface IUpdateData {
  id: string;
  updateData: {
    answer?: IAnswer;
    question?: string;
  };
}
