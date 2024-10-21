import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import { useNavigate } from 'react-router-dom';

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
	const [following, setFollowing] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			navigate('/login', { replace: true });
		}
	}, [navigate, accountname]);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		console.log('Token:', token);
		console.log('Accountname:', accountname);

		const fetchFollowing = async () => {
			setLoading(true);
			setError(null);
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
			} catch (err) {
				setError(err.response?.data?.message || err.message);
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		if (accountname) {
			fetchFollowing();
		}
	}, [accountname]);

	const toggleFollow = async (followee) => {
		const token = localStorage.getItem('authToken');
		const followeeAccountname = followee.accountname;
		setLoading(true);
		try {
			if (followee.isfollow) {
				await axios.delete(
					`https://estapi.mandarin.weniv.co.kr/profile/${followeeAccountname}/unfollow`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setFollowing((prevFollowing) =>
					prevFollowing.map((item) =>
						item._id === followee._id ? { ...item, isfollow: false } : item
					)
				);
			} else {
				await axios.post(
					`https://estapi.mandarin.weniv.co.kr/profile/${followeeAccountname}/follow`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setFollowing((prevFollowing) =>
					prevFollowing.map((item) =>
						item._id === followee._id ? { ...item, isfollow: true } : item
					)
				);
			}
		} catch (err) {
			console.error(err);
			alert(
				err.response?.data?.message ||
					'팔로우/언팔로우 처리 중 오류가 발생했습니다.'
			);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <div>Error: {error}</div>;
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
						following.map((followee) => (
							<FollowingListItem key={followee._id}>
								<FollowingInfo>
									<FollowingImg
										src={followee.image || 'default_image_url'}
										alt={followee.username}
									/>
									<FollowingText>
										<FollowingShopName>{followee.username}</FollowingShopName>
										<FollowingShopDesc>{followee.intro}</FollowingShopDesc>
									</FollowingText>
								</FollowingInfo>
								<Button
									size="sm"
									type="button"
									onClick={() => toggleFollow(followee)}
								>
									{followee.isfollow ? '언팔로우' : '팔로우'}
								</Button>
							</FollowingListItem>
						))
					)}
				</FollowingListContent>
			</InnerWMobileFull>
		</>
	);
}

export default FollowingListPage;

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
