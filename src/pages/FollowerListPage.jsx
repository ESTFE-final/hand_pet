import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import TabNaviComponent from '../components/TabMenuComponents/TabNavi';

// 선언부 구조분해 할당
function FollowerListPage() {
	const [followers, setFollowers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const images = require.context(
		'../assets/images',
		true,
		/\.(png|jpe?g|svg)$/
	);

	//  로직 부분
	useEffect(() => {
		const token = localStorage.getItem('authToken'); // 실제 토큰으로 교체
		const accountname = localStorage.getItem('accountname'); // 실제 계정 이름으로 교체

		// 예외처리 필수
		const fetchFollowers = async () => {
			setLoading(true); // API 호출 시작 시 로딩 상태 설정
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
				consolog.error(err);
			} finally {
				setLoading(false); // API 호출 완료 시 로딩 상태 해제
			}
		};

		fetchFollowers();
	}, []);

	//아하.. 이게 에러처리  throw    try catch finally 안쓰고 하는 경우군
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	// 렌더링 부분
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
										// src={images(`./${follower.image}`)
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
`;
const FollowerShopName = styled.p`
	font-size: 1.6rem;
	margin-bottom: 0.6rem;
`;
const FollowerShopDesc = styled.p`
	color: var(--gray-300);
	font-size: 1.4rem;
`;

export default FollowerListPage;
