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
  deleteUser,
} from 'firebase/auth';

import { get, ref, set } from 'firebase/database';
import { auth, database } from './initialize';
import { IUser } from '../../interfaces/User';

const DB_ADMINS = 'admins';
const DB_BUSINESS_USER = 'BusinessUser';

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

      //비즈니스 유저가 선택되었다면 해당 uid 실시간데이터베이스에 저장
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

//소셜로그인
const getAuthProvider = (type: ISocialLoginData['type']): AuthProvider => {
  if (type === 'google') {
    return new GoogleAuthProvider();
  } else if (type === 'github') {
    return new GithubAuthProvider();
  }
  throw new Error(`유효하지 않은 소셜 로그인 type입니다.: ${type}`);
};

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
    const updatedUser = user ? await getUserData(user) : null;
    setUser(updatedUser);
  });
};

//어드민, 비즈니스 유저 설정
const getUserData = (user: IUser) => {
  //데이터베이스에 저장된 어드민 유저 확인후 어드민유저 설정
  const adminPromise = get(ref(database, DB_ADMINS)).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      return admins.includes(user.uid);
    }
  });

  //데이터베이스에 저장된 비즈니스 유저 확인후 비즈니스유저 설정
  const businessUserPromise = get(ref(database, DB_BUSINESS_USER)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        const businessUser = snapshot.val();
        const businessUserList = Object.values<{ uid: string }>(
          businessUser
        ).map((value) => value.uid);
        return businessUserList.includes(user.uid);
      }
    }
  );
  return Promise.all([adminPromise, businessUserPromise])
    .then(([isAdmin, isBusinessUser]) => {
      return { ...user, isAdmin, isBusinessUser };
    })
    .catch((error) => {
      console.error('어드민, 비즈니스 사용자 데이터 불러오기 오류:', error);
      return user;
    });
};

//사용자 프로필 업데이트
export const editProfile = async (displayName: string) => {
  const user = auth.currentUser;
  if (user) {
    return await updateProfile(user, {
      displayName,
    }).catch((error) => {
      console.error('사용자 프로필 업데이트 오류', error);
    });
  }
};

//계정탙퇴
export const exitUser = async () => {
  const user = auth.currentUser;
  if (!user) return;
  return await deleteUser(user);
};
