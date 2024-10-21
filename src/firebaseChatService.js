import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
	limit,
	serverTimestamp,
} from 'firebase/firestore';
import { auth } from './firebase';

const db = getFirestore();

export const createChatRoom = async (roomId) => {
	try {
		if (!auth.currentUser) {
			throw new Error('사용자가 로그인되지 않았습니다.');
		}

		const newRoomRef = await addDoc(collection(db, 'chats'), {
			name: roomId,
			createdAt: serverTimestamp(),
			createdBy: auth.currentUser.uid,
		});
		return newRoomRef.id;
	} catch (error) {
		console.error('채팅방 생성 중 오류:', error);
		throw error;
	}
};

export const addMessageToChat = async (roomId, message) => {
	try {
		const messageRef = await addDoc(
			collection(db, 'chats', roomId, 'messages'),
			{
				text: message,
				createdAt: serverTimestamp(),
				senderId: auth.currentUser.uid,
			}
		);
		return messageRef.id;
	} catch (error) {
		console.error('메시지 추가 중 오류:', error);
		throw error;
	}
};

export const getChatRooms = async () => {
	try {
		const chatRoomsCollection = collection(db, 'chats');
		const chatRoomsSnapshot = await getDocs(chatRoomsCollection);
		const chatRoomsList = chatRoomsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return chatRoomsList;
	} catch (error) {
		console.error('채팅방 목록 가져오기 오류:', error);
		throw error;
	}
};

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
