import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  AuthProvider,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { get, ref, set } from 'firebase/database';
import { auth, database, db } from './initialize';
import { IUser } from '../../interfaces/User';

interface ISocialLoginData {
  type: 'google' | 'github';
}

//이메일 & 패스워드로 신규가입
export const joinWithEmail = async (
  email: string,
  password: string,
  displayName: string | undefined,
  isBusinessUser: boolean,
  setError: (error: string) => void
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      if (isBusinessUser) {
        set(ref(database, `BusinessUser/${user.displayName}_${user.uid}`), {
          uid: user.uid,
        });
      }
    }) //
    .catch((error) => setError(error.message));
};

//기존 사용자 로그인
export const loginWithEmail = async (
  email: string,
  password: string,
  setError: (error: string) => void
) => {
  await signInWithEmailAndPassword(auth, email, password) //
    .catch((error) => setError(error.message));
};

//로그아웃
export const logout = () => signOut(auth);

const getAuthProvider = (type: 'google' | 'github'): AuthProvider => {
  if (type === 'google') {
    return new GoogleAuthProvider();
  } else if (type === 'github') {
    return new GithubAuthProvider();
  }
  throw new Error(`유효하지 않은 소셜 로그인 type입니다.: ${type}`);
};

//소셜로그인
export const socialLogin = async (
  data: ISocialLoginData,
  setSocialError: (error: string) => void
) => {
  const { type } = data;
  const provider = getAuthProvider(type);
  await signInWithPopup(auth, provider) //
    .catch((error) => setSocialError(error.message));
};

//관찰자 설정 및 유저데이터 가져오기
export const authState = (setUser: (user: IUser | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    setUser(updatedUser);
  });
};

// 어드민 유저 데이터가져오기
const adminUser = async (user: IUser) => {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
};

//사용자 프로필 업데이트
export const editProfile = async (newName: string) => {
  const user = auth.currentUser;
  if (user) {
    return await updateProfile(user, {
      displayName: newName,
    }).catch((error) => {
      console.log(error);
    });
  }
};

//회사명 업데이트
export const editCompany = async (id: string, newCompany: string) => {
  return await updateDoc(doc(db, 'company', id), {
    companyName: newCompany,
  });
};
