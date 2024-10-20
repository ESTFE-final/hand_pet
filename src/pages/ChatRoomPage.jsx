import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Firebase 설정 import
import {
	collection,
	onSnapshot,
	addDoc,
	orderBy,
	query,
} from 'firebase/firestore';
import styled from 'styled-components';

const ChatRoomPage = ({ myProfile, otherProfile }) => {
	const { userId } = useParams(); // URL에서 userId 가져오기
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [image, setImage] = useState(null);

	useEffect(() => {
		// 메시지 컬렉션을 정렬하여 가장 최근 메시지가 아래로 쌓이도록 설정
		const messagesRef = collection(db, 'chats', userId, 'messages');
		const q = query(messagesRef, orderBy('createdAt', 'asc'));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const messagesList = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setMessages(messagesList);
		});

		return () => unsubscribe();
	}, [userId]);

	const handleSendMessage = async () => {
		if (message.trim() === '' && !image) return;

		const newMessage = {
			text: message,
			senderId: '내 아이디', // 현재 사용자 ID로 수정 필요
			createdAt: new Date(),
			imageUrl: image ? URL.createObjectURL(image) : null,
		};

		await addDoc(collection(db, 'chats', userId, 'messages'), newMessage);
		setMessage('');
		setImage(null);
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	return (
		<Container>
			<MessageList>
				{messages.map((msg) => (
					<Message
						key={msg.id}
						isOwnMessage={msg.senderId === '내 아이디'} // 현재 사용자 ID와 비교
					>
						{msg.senderId !== '내 아이디' ? (
							<ProfileImg
								src={otherProfile || '/default_profile.png'}
								alt="상대방 프로필"
							/>
						) : (
							<ProfileImg
								src={myProfile || '/default_profile.png'}
								alt="내 프로필"
							/>
						)}
						<MessageContent isOwnMessage={msg.senderId === '내 아이디'}>
							{msg.text && <p>{msg.text}</p>}
							{msg.imageUrl && <img src={msg.imageUrl} alt="전송된 이미지" />}
							<Time>{new Date(msg.createdAt).toLocaleTimeString()}</Time>
						</MessageContent>
					</Message>
				))}
			</MessageList>
			<MessageInput>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="메세지를 입력하세요"
				/>
				<input type="file" accept="image/*" onChange={handleImageChange} />
				<button onClick={handleSendMessage}>전송</button>
			</MessageInput>
		</Container>
	);
};

const Container = styled.div`
	padding: 2rem;
	position: relative;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

const MessageList = styled.div`
	flex: 1;
	overflow-y: scroll;
	padding-bottom: 6rem; /* 입력창 공간 확보 */
`;

const Message = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: ${({ isOwnMessage }) =>
		isOwnMessage ? 'flex-end' : 'flex-start'};
	margin: 1rem 0;
`;

const ProfileImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 0.5rem;
`;

const MessageContent = styled.div`
	background-color: ${({ isOwnMessage }) =>
		isOwnMessage ? '#e1ffc7' : '#fff'};
	padding: 1rem;
	border-radius: 10px;
	max-width: 60%;
	position: relative;
	word-break: break-word;

	img {
		max-width: 100%;
		border-radius: 10px;
		margin-top: 0.5rem;
	}
`;

const Time = styled.span`
	font-size: 0.8rem;
	color: #888;
	position: absolute;
	bottom: -1.5rem;
	right: 0;
`;

const MessageInput = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	gap: 0.5rem;
	padding: 1rem;
	background-color: #f9f9f9;
	border-top: 1px solid #ddd;

	input[type='text'] {
		flex: 1;
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid #ddd;
	}

	input[type='file'] {
		flex: 0 0 auto;
	}

	button {
		padding: 0.5rem 1rem;
		border: none;
		background-color: #007bff;
		color: white;
		border-radius: 4px;
		cursor: pointer;
	}
`;

export default ChatRoomPage;
