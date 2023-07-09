export interface IAskMe {
  id?: string;
  writer: {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
  };
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
