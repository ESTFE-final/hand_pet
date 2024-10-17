import React from 'react';
import styled from 'styled-components';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';

// 하드코딩된 JSON 데이터
const chatData = [
	{
		id: 1,
		username: '코리안핫가이쌩스머씬',
		image: 'images/user1.jpg',
		message: '안녕하세요! 감사합니다!!',
		timestamp: '2023-10-01 10:00',
		isNew: true,
	},
	{
		id: 2,
		username: '엇나돈데',
		image: 'path/to/user2.jpg',
		message: '안녕하세요! 엇 저돈데',
		timestamp: '2023-10-01 10:05',
		isNew: false,
	},
	{
		id: 3,
		username: '김덕뱁니다.',
		image: 'path/to/user1.jpg',
		message: '형제여...반갑소',
		timestamp: '2023-10-01 10:10',
		isNew: false,
	},
];

const ChatListPage = () => {
	return (
		<>
			<NavigationBar title="채팅 리스트" />
			<ChatListContainer>
				<h1 className="sr-only">채팅 리스트 페이지입니다</h1>
				<ChatListContent>
					{chatData.map((chat) => (
						<ChatListItem key={chat.id}>
							<ChatImage
								src={chat.image}
								alt={`${chat.username}의 프로필 이미지`}
							/>
							<ChatInfo>
								<ChatUsername>{chat.username}</ChatUsername>
								<ChatMessage>{chat.message}</ChatMessage>
								<ChatTimestamp>{chat.timestamp}</ChatTimestamp>
							</ChatInfo>
						</ChatListItem>
					))}
				</ChatListContent>
			</ChatListContainer>
		</>
	);
};

const ChatListContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
	padding-bottom: 10rem;
`;

const ChatListContent = styled.ul`
	padding: 0 1.6rem;
`;

const ChatListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	& + & {
		margin-top: 1.4rem;
	}
`;

const ChatImage = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 1.6rem;
`;

const ChatInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const ChatUsername = styled.p`
	font-size: 2.5rem;
	font-weight: bold;
	margin-bottom: 0.4rem;
`;

const ChatMessage = styled.p`
	font-size: 2rem;
	color: #333;
	margin-bottom: 0.4rem;
`;

const ChatTimestamp = styled.p`
	font-size: 2rem;
	color: var(--gray-300);
	margin-top: 0.4rem;
`;

export default ChatListPage;
