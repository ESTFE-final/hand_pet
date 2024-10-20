// firebaseChatService.js

import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
	limit,
} from 'firebase/firestore';
import { auth } from './firebase';

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

// 4. 채팅방의 최근 메시지 가져오기 함수
export const getLatestMessage = async (roomId) => {
	try {
		const messagesRef = collection(db, 'chats', roomId, 'messages');
		const recentMessageQuery = query(
			messagesRef,
			orderBy('createdAt', 'desc'),
			limit(1)
		);
		const recentMessageSnapshot = await getDocs(recentMessageQuery);

		if (!recentMessageSnapshot.empty) {
			const recentMessageData = recentMessageSnapshot.docs[0].data();
			return {
				text: recentMessageData.text || '사진을 보냈습니다.',
				createdAt: recentMessageData.createdAt.toDate(),
			};
		} else {
			return { text: '아직 메시지가 없습니다.', createdAt: null };
		}
	} catch (error) {
		console.error('최근 메시지 가져오기 오류:', error);
		throw error;
	}
};
