export interface IAskMe {
  id?: string;
  writer: {
    uid: string;
    displayName: string;
    companyName: string;
    photoURL: string;
    email: string;
  };
  question: string;
  isPublic: boolean;
  createAt: number;
  reply: boolean;
}
