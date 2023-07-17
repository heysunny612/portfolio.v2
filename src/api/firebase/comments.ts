import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';

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
import { IComment } from '../../interfaces/Comments';

const COLLECTION_NAME = 'comment';

//CREATE
export const addComment = async (data: IComment) => {
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
    ...(doc.data() as IComment['commentData']),
  }));
  return portfolios;
};

//DELETE
export const deletePortfolio = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

//UPDATE
export const updatePortfolio = async (
  id: string,
  updateData: Partial<IPortfolio>
) => {
  await updateDoc(doc(db, COLLECTION_NAME, id), updateData);
};

//포트폴리오 이미지 업로드
export const uploadImage = async (fileURL: string) => {
  const storageRef = ref(storage, `${COLLECTION_NAME}/${Date.now()}`);
  return await uploadString(storageRef, fileURL, 'data_url')
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .catch((error) => console.log(error));
};

// storage 이미지 삭제
export const deleteImage = async (imgURL: string) => {
  const urlRef = ref(storage, imgURL);
  return await deleteObject(urlRef);
};
