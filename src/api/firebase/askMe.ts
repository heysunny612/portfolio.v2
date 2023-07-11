import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  updateDoc,
  query,
} from 'firebase/firestore';
import { db } from './initialize';
import { IAskMe, IUpdateData } from '../../interfaces/AskMe';

const COLLECTION_NAME = 'question';

//CREATE
export const addQuestion = async (data: IAskMe) => {
  return await addDoc(collection(db, COLLECTION_NAME), data);
};

//READ
export const getQuestion = async (): Promise<IAskMe[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createAt', 'desc'));

  const querySnapshot = await getDocs(q);
  const questions = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IAskMe),
  }));

  return questions;
};

//DELETE
export const deleteQuestion = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

//UPDATE
export const updateQuestion = async (
  id: string,
  updateData: IUpdateData['updateData']
) => {
  await updateDoc(doc(db, COLLECTION_NAME, id), updateData);
};
