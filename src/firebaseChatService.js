// firebaseChatService.js

import {
	getFirestore,
	collection,
	addDoc,
	doc,
	setDoc,
	serverTimestamp,
	getDocs, // getDocs 임포트 추가
} from 'firebase/firestore';
import { auth } from './firebase'; // firebase.js에서 export한 auth를 불러옴

const db = getFirestore();

// 1. 채팅방 생성 함수
export const createChatRoom = async (roomName) => {
	try {
		if (!auth.currentUser) {
			throw new Error('사용자가 로그인되지 않았습니다.');
		}

		const newRoomRef = await addDoc(collection(db, 'chats'), {
			name: roomName,
			createdAt: serverTimestamp(),
			createdBy: auth.currentUser.uid, // 현재 로그인한 유저 ID
		});
		return newRoomRef.id; // 생성된 채팅방 ID 반환
	} catch (error) {
		console.error('채팅방 생성 중 오류:', error);
		throw error;
	}
};

// 2. 채팅 메시지 추가 함수
export const addMessageToChat = async (roomId, message) => {
	try {
		const messageRef = await addDoc(
			collection(db, 'chats', roomId, 'messages'),
			{
				text: message,
				createdAt: serverTimestamp(),
				senderId: auth.currentUser.uid, // 현재 로그인한 유저 ID
			}
		);
		return messageRef.id; // 생성된 메시지 ID 반환
	} catch (error) {
		console.error('메시지 추가 중 오류:', error);
		throw error;
	}
};

// 3. 채팅방 목록 가져오기 함수
export const getChatRooms = async () => {
	try {
		const chatRoomsCollection = collection(db, 'chats'); // 채팅방 컬렉션의 이름이 'chats'로 되어 있으니 변경
		const chatRoomsSnapshot = await getDocs(chatRoomsCollection);
		const chatRoomsList = chatRoomsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return chatRoomsList;
	} catch (error) {
		console.error('채팅방 목록 가져오기 오류:', error);
		throw error; // 에러를 던져서 호출한 곳에서 처리할 수 있도록
	}
};
