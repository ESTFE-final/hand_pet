// ChatListPage.jsx

import styled from 'styled-components';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getLatestMessage } from '../firebaseChatService'; // Firebase에서 최근 메시지 가져오는 함수

const ChatListPage = () => {
	const [followers, setFollowers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		const accountname = localStorage.getItem('accountname');

		const fetchFollowers = async () => {
			setLoading(true);
			try {
				// 팔로워 리스트 가져오기
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

				// 각 팔로워의 최근 메시지 가져오기
				const followersWithMessages = await Promise.all(
					followersData.map(async (follower) => {
						const latestMessage = await getLatestMessage(follower.accountname);
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

	const handleChatClick = (follower) => {
		navigate(`/chat/${follower.accountname}`, {
			state: { otherProfile: follower.image }, // 팔로워의 프로필 이미지 전달
		});
	};

	return (
		<>
			<NavigationBar title="채팅 리스트" />
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
		</>
	);
};

const ChatListContainer = styled.div`
	width: 100%;
	margin: 0 auto;
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
