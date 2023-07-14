import { getDownloadURL, ref, uploadString } from 'firebase/storage';

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
import { IPortfolio } from '../../interfaces/Portfolio';
import { db, storage } from './initialize';

const COLLECTION_NAME = 'portfolio';

//CREATE
export const addPortfolio = async (data: IPortfolio) => {
  return await addDoc(collection(db, COLLECTION_NAME), data);
};

//READ
export const getPortfolios = async (): Promise<IPortfolio[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const portfolios = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IPortfolio),
  }));
  return portfolios;
};

//DELETE
export const deletePortfolio = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

//UPDATE
export const updatePortfolio = async (id, updateData) => {
  await updateDoc(doc(db, COLLECTION_NAME, id), updateData);
};

//포트폴리오 이미지 업로드
export const uploadImage = async (fileURL: string) => {
  const storageRef = ref(storage, `${COLLECTION_NAME}/${Date.now()}`);
  return await uploadString(storageRef, fileURL, 'data_url')
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .catch((error) => console.log(error));
};
