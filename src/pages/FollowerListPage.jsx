import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import { useNavigate } from 'react-router-dom';

import { keyframes } from 'styled-components';

// 로딩 스피너로 적용  try catch finally  그리고 setloading true false 그리고 if loading으로 처리

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-left-color: #22a6b3;
	border-radius: 50%;
	width: 36px;
	height: 36px;
	animation: ${spin} 1s linear infinite;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

function FollowerListPage() {
	const [followers, setFollowers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const images = require.context(
		'../assets/images',
		true,
		/\.(png|jpe?g|svg)$/
	);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			navigate('/login', { replace: true });
		}
	}, [navigate]);

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
				setFollowers(response.data);
				console.log(response.data);
			} catch (err) {
				setError(err.response?.data?.message || err.message);
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchFollowers();
		console.log(fetchFollowers);
	}, []);

	if (loading) {
		return <LoadingSpinner />; // 로딩 중일 때 로딩 스피너 표시
	}

	if (error) {
		return (
			<ErrorMessage>
				{error}
				<Link to="/login">
					<Button size="m" type="button">
						로그인 페이지
					</Button>
				</Link>
			</ErrorMessage>
		);
	}

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
							<FollowerListItem key={follower._id}>
								<FollowerInfo>
									<FollowerImg src={follower.image} alt={follower.username} />
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

const ErrorMessage = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	font-size: 4rem;
	font-weight: bold;
`;

export default FollowerListPage;
