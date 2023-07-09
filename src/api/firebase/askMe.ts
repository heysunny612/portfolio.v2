import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from './initialize';
import { IAskMe, IAnswer } from '../../interfaces/AskMe';

const COLLECTION_NAME = 'question';

//CREATE
export const addQuestion = async (data: IAskMe) => {
  return await addDoc(collection(db, COLLECTION_NAME), data);
};

//READ
export const getQuestion = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IAskMe[];
};

//DELETE
export const deleteQuestion = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

//UPDATE
//UPDATE
export const updateQuestion = async (id: string, answer: IAnswer) => {
  await updateDoc(doc(db, COLLECTION_NAME, id), { answer });
};
