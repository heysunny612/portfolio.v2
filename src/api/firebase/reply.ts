import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from './initialize';
import { IReply } from '../../interfaces/Reply';

const COLLECTION_NAME = 'reply';

//CREATE
export const addReply = async (data: IReply) => {
  return await addDoc(collection(db, COLLECTION_NAME), data);
};

//READ
export const getReply = async (): Promise<IReply[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt'));
  const querySnapshot = await getDocs(q);
  const reply = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IReply),
  }));
  return reply;
};

//DELETE
export const deleteReply = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

//UPDATE
export const updateReply = async (id: string, reply: string) => {
  await updateDoc(doc(db, COLLECTION_NAME, id), { reply });
};
