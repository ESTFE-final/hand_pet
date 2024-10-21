import React from 'react';
import styled from 'styled-components';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import imgFollower06 from '../assets/images/img-follower-06.png';
import imgFollower05 from '../assets/images/img-follower-05.png';
import imgFollower02 from '../assets/images/img-follower-02.png';
import TabNaviComponent from '../components/TabMenuComponents/TabNavi';

// 하드코딩된 JSON 데이터
const chatData = [
	{
		id: 1,
		username: '오필승코리안',
		image: imgFollower06,
		message: '안녕하세요! 감사합니다!!',
		timestamp: '2023-10-07 11:22',
		isNew: true,
	},
	{
		id: 2,
		username: '오오래오래',
		image: imgFollower05,
		message: '안녕하세요! 엇 저돈데',
		timestamp: '2023-10-02 10:05',
		isNew: false,
	},
	{
		id: 3,
		username: '대한민쿡쫙짜짜짜짜',
		image: imgFollower02,
		message: '형제여...반갑소',
		timestamp: '2023-10-04 03:10',
		isNew: false,
	},
];

const ChatListPage = () => {
	return (
		<>
			<CustomProfileNavBar title="채팅 리스트" />
			<ChatListContainer>
				<h1 className="sr-only">채팅 리스트 페이지입니다</h1>
				<ChatListContent>
					{chatData.map((chat) => (
						<ChatListItem key={chat.id} tabIndex="0">
							<ChatImageContainer>
								<ChatImage
									src={chat.image}
									alt={`${chat.username}의 프로필 이미지`}
								/>
								{chat.isNew && <NewIndicator />}
							</ChatImageContainer>
							<ChatInfo>
								<ChatUsername>{chat.username}</ChatUsername>
								<ChatTextBox>
									<ChatMessage>{chat.message}</ChatMessage>
									<ChatTimestamp>{chat.timestamp}</ChatTimestamp>
								</ChatTextBox>
							</ChatInfo>
						</ChatListItem>
					))}
				</ChatListContent>
			</ChatListContainer>
			<TabNaviComponent />
		</>
	);
};

const CustomProfileNavBar = styled(NavigationBar)`
	border: none;
`;

const ChatListContainer = styled.div`
	width: 100%;
	margin: 24px auto;
	position: relative;
	padding-bottom: 10rem;
`;

const ChatListContent = styled.ul`
	padding: 0 1.6rem;
`;

const ChatListItem = styled.li`
	display: flex;
	align-items: center;
	cursor: pointer;
	& + & {
		margin-top: 2rem;
	}
	&:hover {
		background-color: #f0f0f0;
		border-radius: 20px;
	}
`;

const ChatImageContainer = styled.div`
	position: relative;
	width: 48px;
	margin-right: 1.2rem;
`;

const ChatImage = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
`;

const NewIndicator = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 12px;
	height: 12px;
	background-color: red;
	border-radius: 50%;
`;

const ChatInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
`;

const ChatUsername = styled.p`
	font-size: 1.6rem;
	margin-bottom: 0.4rem;
`;

const ChatTextBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const ChatMessage = styled.p`
	font-size: 1.4rem;
	color: var(--gray-300);
	margin-bottom: 0.4rem;
`;

const ChatTimestamp = styled.p`
	font-size: 1rem;
	color: var(--gray);
	margin-top: 0.4rem;
`;

export default ChatListPage;
