import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';

function FollowerListPage() {
	const images = require.context(
		'../assets/images',
		true,
		/\.(png|jpe?g|svg)$/
	);

	const followersData = [
		{
			name: '댕케',
			description: '강아지 수제 케이크 | 수제 간식',
			image: 'img-follower-01.png',
		},
		{
			name: '의류 핸드메이드샵',
			description: '펫 의류 자체 제작합니다',
			image: 'img-follower-02.png',
		},
		{
			name: '하루네',
			image: 'img-follower-03.png',
		},
		{
			name: '냥이집_고양이 용품 판매',
			description: '고양이 맞춤 용품 판매점',
			image: 'img-follower-04.png',
		},
		{
			name: '노을이',
			image: 'img-follower-05.png',
		},
		{
			name: '햄토리몰',
			description: '햄스터 전용 용품 | 간식 판매 🐹',
			image: 'img-follower-06.png',
		},
		{
			name: '레빗샵',
			description: '고토끼 수제 간식, 옷, 용품 등 토순이들...',
			image: 'img-follower-07.png',
		},
	];

	return (
		<>
			<NavigationBar title="팔로워" />
			<InnerWMobileFull>
				<h1 className="sr-only">팔로워 리스트 페이지입니다</h1>
				<FollowerListContent>
					{followersData.map((follower, index) => (
						<FollowerListItem key={index}>
							<FollowerInfo>
								<FollowerImg
									src={images(`./${follower.image}`)}
									alt={follower.name}
								/>
								<FollowerText>
									<FollowerShopName>{follower.name}</FollowerShopName>
									<FollowerShopDesc>{follower.description}</FollowerShopDesc>
								</FollowerText>
							</FollowerInfo>
							<Button size="sm" type="button">
								팔로우
							</Button>
						</FollowerListItem>
					))}
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

export default FollowerListPage;
