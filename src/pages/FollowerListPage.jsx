import { Link, useParams } from 'react-router-dom'; // useParams 추가
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import TabNaviComponent from '../components/TabMenuComponents/TabNavi';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/SharedComponents/CommonComponents';

function FollowerListPage() {
	const { accountname } = useParams(); // URL에서 accountname 파라미터를 받아옴
	const [followers, setFollowers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('authToken');

		const fetchFollowers = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					`https://estapi.mandarin.weniv.co.kr/profile/${accountname}/follower`, // 동적 accountname 사용
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setFollowers(response.data);
			} catch (err) {
				setError(err.response?.data?.message || err.message);
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		if (accountname) {
			fetchFollowers(); // accountname이 있을 때만 호출
		}
	}, [accountname]); // accountname 변경 시마다 팔로워 리스트 다시 불러옴

	const toggleFollow = async (follower) => {
		const token = localStorage.getItem('authToken');
		const followerAccountname = follower.accountname;

		try {
			if (follower.isfollow) {
				await axios.delete(
					`https://estapi.mandarin.weniv.co.kr/profile/${followerAccountname}/unfollow`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setFollowers((prevFollowers) =>
					prevFollowers.map((item) =>
						item._id === follower._id ? { ...item, isfollow: false } : item
					)
				);
			} else {
				await axios.post(
					`https://estapi.mandarin.weniv.co.kr/profile/${followerAccountname}/follow`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setFollowers((prevFollowers) =>
					prevFollowers.map((item) =>
						item._id === follower._id ? { ...item, isfollow: true } : item
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
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<CustomProfileNavBar title="팔로워" />
			<InnerWMobileFull>
				<h1 className="sr-only">팔로워 리스트 페이지입니다</h1>
				<FollowerListContent>
					{followers.length === 0 ? (
						<div>팔로워가 없습니다.</div>
					) : (
						followers.map((follower) => (
							<FollowerListItem key={follower._id}>
								<FollowerInfo>
									<FollowerImg
										src={follower.image || 'default_image_url'}
										alt={follower.username}
									/>
									<FollowerText>
										<FollowerShopName>{follower.username}</FollowerShopName>
										<FollowerShopDesc>{follower.intro}</FollowerShopDesc>
									</FollowerText>
								</FollowerInfo>
								<Button
									size="sm"
									type="button"
									onClick={() => toggleFollow(follower)}
								>
									{follower.isfollow ? '언팔로우' : '팔로우'}
								</Button>
							</FollowerListItem>
						))
					)}
				</FollowerListContent>
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

const FollowerInfo = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 1.2rem;
`;

const FollowerListContent = styled.ul`
	padding: 0 1.6rem;
`;

const FollowerListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	& + & {
		margin-top: 1.6rem;
	}
`;

const FollowerImg = styled.img`
	background: var(--gray);
	width: 50px;
	height: 50px;
	overflow: hidden;
	border-radius: 50%;
	flex-shrink: 0;
`;

const FollowerText = styled.div`
	padding-top: 0.7rem;
	margin-right: 2rem;
`;

const FollowerShopName = styled.p`
	font-size: 1.4rem;
	margin-bottom: 0.6rem;
`;

const FollowerShopDesc = styled.p`
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
`;

export default FollowerListPage;
