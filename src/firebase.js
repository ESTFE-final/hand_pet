// firebase.js 파일 수정
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Firestore 모듈 추가

const firebaseConfig = {
	apiKey: 'AIzaSyA3_c180O6qne1JRY-3pn58bBsJaH4CX5c',
	authDomain: 'hand-pet.firebaseapp.com',
	projectId: 'hand-pet',
	storageBucket: 'hand-pet.appspot.com',
	messagingSenderId: '681607366051',
	appId: '1:681607366051:web:359168e10882e518724616',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore 인스턴스 생성
export const firestore = getFirestore(app); // Firestore 초기화 및 내보내기
