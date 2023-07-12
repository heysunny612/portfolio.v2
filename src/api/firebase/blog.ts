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
import { db, storage } from './initialize';
import { IAskMe, IUpdateData } from '../../interfaces/AskMe';
import { IBlog } from '../../interfaces/Blog';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

const COLLECTION_NAME = 'blog';

//CREATE
export const addBlog = async (data: IBlog) => {
  return await addDoc(collection(db, COLLECTION_NAME), data);
};

//READ
export const getblogItems = async (): Promise<IAskMe[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createAt', 'desc'));

  const querySnapshot = await getDocs(q);
  const questions = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IAskMe),
  }));

  return questions;
};

//DELETE
export const deleteBlogItem = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

//UPDATE
export const updateBlogItem = async (
  id: string,
  updateData: IUpdateData['updateData']
) => {
  await updateDoc(doc(db, COLLECTION_NAME, id), updateData);
};

//블로그 에디터 이미지 storage에 업로드

export const uploadImage = async (file: any) => {
  const storageRef = ref(storage, `blog/${Date.now()}`);
  return await uploadBytes(storageRef, file)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .catch((error) => console.log(error));
};

// DELETE the file
export const deleteImage = async (imgURL: string) => {
  const urlRef = ref(storage, imgURL);
  return await deleteObject(urlRef);
};
