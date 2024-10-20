import { Link, useNavigate } from 'react-router-dom'; // useNavigate로 변경
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';

function FollowerListPage() {
	const [followers, setFollowers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const images = require.context(
		'../assets/images',
		true,
		/\.(png|jpe?g|svg)$/
	);

	const navigate = useNavigate(); // useNavigate 훅 사용

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
				console.log(response.data);
				setFollowers(response.data);
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
		// 채팅방으로 이동하는 로직
		navigate(`/chat/${follower.accountname}`); // 팔로워의 accountname을 사용하여 경로 설정
	};

	return (
		<>
			<NavigationBar title="팔로워" />
			<InnerWMobileFull>
				<h1 className="sr-only">팔로워 리스트 페이지입니다</h1>
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
										// src={images(`./${follower.image}`)}
										alt={follower.username}
									/>
									<FollowerText>
										<FollowerShopName>{follower.username}</FollowerShopName>
										<FollowerShopDesc>{follower.intro}</FollowerShopDesc>
									</FollowerText>
								</FollowerInfo>
								<Button size="sm" type="button">
									{follower.isfollow ? '언팔로우' : '팔로우'}
								</Button>
							</FollowerListItem>
						))
					)}
				</FollowerListContent>
			</InnerWMobileFull>
		</>
	);
}

const InnerWMobileFull = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
	padding-bottom: 10rem;
`;
const FollowerInfo = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 1.6rem;
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
	cursor: pointer; // 클릭 가능하도록 커서 변경
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

export default FollowerListPage;
