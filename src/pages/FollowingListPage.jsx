import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';

import TabNaviComponent from '../components/TabMenuComponents/TabNavi';

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

function FollowingListPage() {
	const { accountname } = useParams();
	const [followings, setFollowings] = useState([]);
	const [loading, setLoading] = useState(true); // loading 변수 정의
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		console.log('Token:', token); // 토큰 확인
		console.log('Accountname:', accountname); // accountname 확인

		const fetchFollowings = async () => {
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
				setFollowings(response.data);
			} catch (err) {
				setError(err.response?.data?.message || err.message);
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		if (accountname) {
			fetchFollowings();
		}
	}, [accountname]);

	const toggleFollow = async (following) => {
		const token = localStorage.getItem('authToken');
		const followingAccountname = following.accountname;

		try {
			if (following.isfollow) {
				await axios.delete(
					`https://estapi.mandarin.weniv.co.kr/profile/${followingAccountname}/unfollow`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setFollowings((prevFollowings) =>
					prevFollowings.map((item) =>
						item._id === following._id ? { ...item, isfollow: false } : item
					)
				);
			} else {
				await axios.post(
					`https://estapi.mandarin.weniv.co.kr/profile/${followingAccountname}/follow`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setFollowings((prevFollowings) =>
					prevFollowings.map((item) =>
						item._id === following._id ? { ...item, isfollow: true } : item
					)
				);
			}
		} catch (err) {
			console.error(err);
			alert(
				err.response?.data?.message ||
					'팔로우/언팔로우 처리 중 오류가 발생했습니다.'
			);
		}
	};

	if (loading) {
		return <div>Loading...</div>; // loading이 true일 때 로딩 메시지
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<CustomProfileNavBar title="팔로잉" />
			<InnerWMobileFull>
				<h1 className="sr-only">팔로잉 리스트 페이지입니다</h1>
				<FollowingListContent>
					{followings.length === 0 ? (
						<div>팔로잉이 없습니다.</div>
					) : (
						followings.map((following) => (
							<FollowingListItem key={following._id}>
								<FollowingInfo>
									<FollowingImg
										src={following.image || 'default_image_url'}
										alt={following.username}
									/>
									<FollowingText>
										<FollowingShopName>{following.username}</FollowingShopName>
										<FollowingShopDesc>{following.intro}</FollowingShopDesc>
									</FollowingText>
								</FollowingInfo>
								<FollowingButton
									size="sm"
									type="button"
									onClick={() => toggleFollow(following)}
								>
									{following.isfollow ? '언팔로우' : '팔로우'}
								</FollowingButton>
							</FollowingListItem>
						))
					)}
				</FollowingListContent>
			</InnerWMobileFull>
			<TabNaviComponent />
		</>
	);
}

const CustomProfileNavBar = styled(NavigationBar)`
	border: none;
`;

const InnerWMobileFull = styled.div`
	width: 100%;
	margin: 24px auto;
	position: relative;
	padding-bottom: 10rem;
`;

const FollowingInfo = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 1.2rem;
`;

const FollowingListContent = styled.ul`
	padding: 0 1.6rem;
`;

const FollowingListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	& + & {
		margin-top: 1.6rem;
	}
`;

const FollowingImg = styled.img`
	background: var(--gray);
	width: 50px;
	height: 50px;
	overflow: hidden;
	border-radius: 50%;
	flex-shrink: 0;
`;

const FollowingText = styled.div`
	padding-top: 0.7rem;
	margin-right: 2rem;
`;

const FollowingShopName = styled.p`
	font-size: 1.4rem;
	margin-bottom: 0.6rem;
`;

const FollowingShopDesc = styled.p`
	color: var(--gray-300);
	font-size: 1.2rem;
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

const FollowingButton = styled(Button)`
	&& {
		--button-max-width: fit-content;
	}
`;

export default FollowingListPage;
