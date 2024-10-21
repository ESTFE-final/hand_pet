import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import {
	collection,
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
	orderBy,
	query,
	Timestamp,
} from 'firebase/firestore';
import styled from 'styled-components';
import uploadIcon from '../assets/icons/upload-file.svg';
import uploadButton from '../assets/icons/icon-feed-upload.svg';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';

const ChatRoomPage = () => {
	const { userId } = useParams();
	const { state } = useLocation();
	const otherProfile = state?.otherProfile || '/default_profile_image.png';
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const currentUserId = localStorage.getItem('accountname');

	useEffect(() => {
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
			senderId: currentUserId,
			createdAt: Timestamp.now(),
			imageUrl: imageUrl || null,
		};

		await addDoc(collection(db, 'chats', userId, 'messages'), newMessage);
		setMessage('');
		setImage(null);
		setImageUrl(null);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setImageUrl(URL.createObjectURL(file));
		}
	};

	const handleDeleteMessage = async (messageId) => {
		const messageRef = doc(db, 'chats', userId, 'messages', messageId);
		await deleteDoc(messageRef);
	};

	return (
		<>
			<NavigationBar title={'채팅방'} />
			<Container>
				<MessageList>
					{messages.map((msg) => {
						const isOwnMessage = msg.senderId === currentUserId;
						return (
							<Message key={msg.id} isOwnMessage={isOwnMessage}>
								{!isOwnMessage && (
									<ProfileImg src={otherProfile} alt="상대방 프로필" />
								)}
								<MessageContent isOwnMessage={isOwnMessage}>
									{msg.text && <p>{msg.text}</p>}
									{msg.imageUrl && (
										<img src={msg.imageUrl} alt="전송된 이미지" />
									)}
									<Time>
										{msg.createdAt && msg.createdAt.toDate
											? msg.createdAt.toDate().toLocaleTimeString()
											: '날짜 정보 없음'}
									</Time>
								</MessageContent>
								{isOwnMessage && (
									<DeleteButton onClick={() => handleDeleteMessage(msg.id)}>
										삭제
									</DeleteButton>
								)}
							</Message>
						);
					})}
				</MessageList>
				<MessageInput>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						id="image-upload"
						style={{ display: 'none' }}
					/>
					<label htmlFor="image-upload">
						<UploadIcon src={uploadIcon} alt="이미지 업로드" />
					</label>
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="메세지를 입력하세요"
					/>
					<SendButton onClick={handleSendMessage}>
						<img src={uploadButton} alt="전송" />
					</SendButton>
				</MessageInput>
				{imageUrl && (
					<Preview>
						<img src={imageUrl} alt="미리보기" />
					</Preview>
				)}
			</Container>
		</>
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
	padding-bottom: 6rem;
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

const Message = styled.div`
	display: flex;
	align-items: flex-end;
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
		isOwnMessage ? '#ffd2c7' : 'var(--graylight-100)'};
	padding: 1rem;
	border-radius: 10px;
	max-width: 60%;
	position: relative;
	word-break: break-word;

	img {
		max-width: 100%;
		max-height: 250px;
		border-radius: 10px;
		margin-top: 0.5rem;
	}
`;

const Time = styled.span`
	font-size: 0.8rem;
	color: #888;
	margin-top: 0.5rem;
	display: block;
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
`;
const SendButton = styled.button`
	border: none;
	background: transparent;
	cursor: pointer;
	img {
		width: 30px;
		height: 30px;
	}
`;

const UploadIcon = styled.img`
	width: 30px;
	height: 30px;
	cursor: pointer;
`;

const DeleteButton = styled.button`
	margin-left: 0.5rem;
	padding: 0.5rem 0.5rem;
	border: none;
	background-color: #ff4d4d;
	color: white;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
`;

const Preview = styled.div`
	margin: auto;
	img {
		max-width: 100%;
		max-height: 150px
		border-radius: 10px;
	}
`;

export default ChatRoomPage;
