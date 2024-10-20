import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Firebase 설정 import
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import styled from 'styled-components';

const ChatRoomPage = () => {
	const { userId } = useParams(); // URL에서 userId 가져오기
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	useEffect(() => {
		console.log('db:', db);
		console.log('userId:', userId);

		if (!db || !userId) {
			console.error('db or userId is undefined');
			return; // db 또는 userId가 없으면 함수 종료
		}

		const messagesRef = collection(db, 'chats', userId, 'messages');
		// 데이터 가져오는 추가 로직
	}, [db, userId]);
	useEffect(() => {
		const messagesRef = collection(db, 'chats', userId, 'messages');
		const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
			const messagesList = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setMessages(messagesList);
		});
		return () => unsubscribe();
	}, [userId]);

	const handleSendMessage = async () => {
		if (message.trim() === '') return;

		const newMessage = {
			text: message,
			senderId: '내 아이디', // 여기에 현재 사용자 ID 추가
			createdAt: new Date(),
		};

		await addDoc(collection(db, 'chats', userId, 'messages'), newMessage);
		setMessage('');
	};

	return (
		<Container>
			<h2>유저 아이디: {userId}</h2>
			<MessageList>
				{messages.map((msg) => (
					<Message key={msg.id}>
						<strong>{msg.senderId}: </strong>
						{msg.text}
					</Message>
				))}
			</MessageList>
			<MessageInput>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type a message"
				/>
				<button onClick={handleSendMessage}>Send</button>
			</MessageInput>
		</Container>
	);
};

const Container = styled.div`
	padding: 2rem;
`;

const MessageList = styled.div`
	height: 300px;
	overflow-y: scroll;
	margin-bottom: 1rem;
`;

const Message = styled.div`
	margin: 0.5rem 0;
`;

const MessageInput = styled.div`
	display: flex;
	gap: 0.5rem;
`;

export default ChatRoomPage;
