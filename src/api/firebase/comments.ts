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
import { IComment } from '../../interfaces/Comments';

const COLLECTION_NAME = 'comment';

//CREATE
export const addComment = async (data: IComment) => {
  return await addDoc(collection(db, COLLECTION_NAME), data);
};

//READ
export const getComments = async (): Promise<IComment[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const comments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IComment),
  }));
  return comments;
};

//DELETE
export const deleteComment = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

//UPDATE
export const updateComment = async (id: string, comment: string) => {
  await updateDoc(doc(db, COLLECTION_NAME, id), { comment });
};
