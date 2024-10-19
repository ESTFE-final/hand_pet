import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';

function FollowingListPage() {
	const [following, setFollowing] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const images = require.context(
		'../assets/images',
		true,
		/\.(png|jpe?g|svg)$/
	);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		const accountname = localStorage.getItem('accountname');

		// 부정  토큰 아니면
		if (!token) {
			setError('해당 계정이 존재하지 않습니다.');
			setLoading(false);
			return;
		}

		const fetchFollowing = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`https://estapi.mandarin.weniv.co.kr/profile/${accountname}/following`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setFollowing(response.data);
				console.log(response.data);
			} catch (err) {
				setError(err.response?.data?.message || err.message);
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchFollowing();
		console.log(fetchFollowing);
	}, []);

	if (loading) {
		return <div>Loading...</div>;
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
			<NavigationBar title="팔로잉" />
			<InnerWMobileFull>
				<h1 className="sr-only">팔로잉 리스트 페이지입니다</h1>
				<FollowingListContent>
					{following.length === 0 ? (
						<div>팔로잉이 없습니다.</div>
					) : (
						following.map((follow) => (
							<FollowingListItem key={follow._id}>
								<FollowingInfo>
									<FollowingImg
										// src={images(`./${follow.image}`)
										alt={follow.username}
									/>
									<FollowingText>
										<FollowingShopName>{follow.username}</FollowingShopName>
										<FollowingShopDesc>{follow.intro}</FollowingShopDesc>
									</FollowingText>
								</FollowingInfo>
								<Button size="sm" type="button">
									{follow.isfollow ? '언팔로우' : '팔로우'}
								</Button>
							</FollowingListItem>
						))
					)}
				</FollowingListContent>
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
const FollowingInfo = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 1.6rem;
`;
const FollowingListContent = styled.ul`
	padding: 0 1.6rem;
`;

const FollowingListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	& + & {
		margin-top: 3.4rem;
	}
`;

const FollowingImg = styled.img`
	background: var(--gray);
	width: 72px;
	height: 72px;
	overflow: hidden;
	border-radius: 50%;
	flex-shrink: 0;
`;
const FollowingText = styled.div`
	padding-top: 0.7rem;
`;
const FollowingShopName = styled.p`
	font-size: 2rem;
	margin-bottom: 0.6rem;
`;
const FollowingShopDesc = styled.p`
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
	color: black;
`;

export default FollowingListPage;
