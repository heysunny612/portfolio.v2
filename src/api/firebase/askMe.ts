import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './initialize';
import { IAskMe } from '../../interfaces/AskMe';

const COLLECTION_NAME = 'question';

export const addQuestion = async (data: IAskMe) => {
  return await addDoc(collection(db, COLLECTION_NAME), data);
};

export const getQuestion = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IAskMe[];
};
