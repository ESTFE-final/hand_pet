import styled from 'styled-components';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	getLatestMessage,
	createChatRoom,
	getChatRooms,
} from '../firebaseChatService';
import TabNaviComponent from '../components/TabMenuComponents/TabNavi';

const ChatListPage = () => {
	const [followers, setFollowers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const getChatRoomId = (userId1, userId2) => {
		const sortedIds = [userId1, userId2].sort();
		return `${sortedIds[0]}_${sortedIds[1]}`;
	};

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		const accountname = localStorage.getItem('accountname');

		const fetchFollowers = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`https://estapi.mandarin.weniv.co.kr/profile/${accountname}/follower`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);

				const followersData = response.data;
				const currentUserId = accountname;

				const followersWithMessages = await Promise.all(
					followersData.map(async (follower) => {
						const chatRoomId = getChatRoomId(
							currentUserId,
							follower.accountname
						);
						const latestMessage = await getLatestMessage(chatRoomId);
						return {
							...follower,
							lastMessage: latestMessage.text,
							lastMessageDate: latestMessage.createdAt
								? latestMessage.createdAt.toLocaleString()
								: 'N/A',
						};
					})
				);

				setFollowers(followersWithMessages);
			} catch (err) {
				setError(err.response?.data?.message || err.message);
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchFollowers();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const handleChatClick = async (follower) => {
		const currentUserId = localStorage.getItem('accountname');
		const targetUserId = follower.accountname;
		const chatRoomId = getChatRoomId(currentUserId, targetUserId);

		try {
			const existingChatRooms = await getChatRooms();
			const existingRoom = existingChatRooms.find(
				(room) => room.id === chatRoomId
			);

			if (existingRoom) {
				navigate(`/chat/${chatRoomId}`, {
					state: { otherProfile: follower.image },
				});
			} else {
				await createChatRoom(chatRoomId);
				navigate(`/chat/${chatRoomId}`, {
					state: { otherProfile: follower.image },
				});
			}
		} catch (error) {
			console.error('채팅방 클릭 처리 중 오류:', error);
		}
	};

	return (
		<>
			<CustomProfileNavBar title="채팅 리스트" />
			<ChatListContainer>
				<h1 className="sr-only">채팅 리스트 페이지입니다</h1>
				<FollowerListContent>
					{followers.length === 0 ? (
						<div>팔로워가 없습니다.</div>
					) : (
						followers.map((follower) => (
							<FollowerListItem
								key={follower._id}
								onClick={() => handleChatClick(follower)}
							>
								<FollowerInfo>
									<FollowerImg
										src={follower.image || '/default_profile_image.png'}
										alt={follower.username}
									/>
									<FollowerText>
										<FollowerShopName>{follower.username}</FollowerShopName>
										<FollowerShopDesc>
											{follower.lastMessage || '최근 메시지가 없습니다.'}
										</FollowerShopDesc>
										<ChatTimestamp>
											{follower.lastMessageDate || 'N/A'}
										</ChatTimestamp>
									</FollowerText>
								</FollowerInfo>
							</FollowerListItem>
						))
					)}
				</FollowerListContent>
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

const FollowerListContent = styled.ul`
	padding: 0 1.6rem;
`;

const FollowerListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	& + & {
		margin-top: 3.4rem;
	}
	cursor: pointer;
`;

const FollowerInfo = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 1.6rem;
`;

const FollowerImg = styled.img`
	background: var(--gray);
	width: 72px;
	height: 72px;
	overflow: hidden;
	border-radius: 50%;
	flex-shrink: 0;
`;

const FollowerText = styled.div`
	padding-top: 0.7rem;
`;

const ChatTextBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const FollowerShopName = styled.p`
	font-size: 2rem;
	margin-bottom: 0.6rem;
`;

const FollowerShopDesc = styled.p`
	color: var(--gray-300);
	font-size: 1.8rem;
`;

const ChatTimestamp = styled.span`
	color: var(--gray-500);
	font-size: 1.4rem;
	display: block;
	margin-top: 0.4rem;
`;

export default ChatListPage;
