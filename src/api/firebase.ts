import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  AuthProvider,
} from 'firebase/auth';
import { IUser } from '../interfaces/User';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface IAuthData {
  email: string;
  password: string;
  setError: (error: string) => void;
  company?: string;
}

interface ISocialLoginData {
  type: 'google' | 'github';
}

//이메일 & 패스워드로 신규가입
export const joinWithEmail = async (data: IAuthData) => {
  const { email, password, company, setError } = data;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      if (!company) return;
    }) //
    .catch((error) => setError(error.message));
};

//기존 사용자 로그인
export const loginWithEmail = async (data: IAuthData) => {
  const { email, password, setError } = data;
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
  return onAuthStateChanged(auth, (user) => setUser(user || null));
};
