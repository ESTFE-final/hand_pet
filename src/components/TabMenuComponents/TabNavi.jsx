import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// SVG 이미지 import
import iconMain from '../../assets/icons/icon-home.svg';
import iconAbout from '../../assets/icons/icon-message-circle.svg';
import iconContact from '../../assets/icons/icon-edit.svg';
import iconProfile from '../../assets/icons/icon-user.svg';

// Container 스타일
const TabNavi = styled.div`
	display: flex;
	position: fixed;
	justify-content: space-around;
	align-items: center;
	width: 777px;
	bottom: 0;
	max-height: 96px;
	height: 96px;
	max-width: 100%;
	background-color: #ffffff;
	border-top: 1px solid #e5e5e5;
`;

// Button 스타일
const TabNaviButton = styled.button`
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	justify-items: center;
	align-items: center;
	align-content: space-evenly;
	padding: 0;
	margin: 0;
	width: 107px;
	max-height: 96px;
	background: none;
	border: none;
	font-family: 'Gmarket Sans TTF';
	font-size: 20px;
	color: #767676;
	font-weight: 900;
	line-height: 28px;
	max-width: 126px;
	word-break: keep-all;
`;

// Icon 스타일
const TabNaviIcon = styled.img`
	// Icon 스타일
	min-width: 48px;
	width: 48px;
	max-height: 48px;
	margin: auto;
	padding: auto;
	justify-content: center;
	align-items: center;
`;

// 탭 정보를 담은 배열
const tabs = [
	{ path: '/', label: '홈', icon: iconMain },
	{ path: '/About', label: '채팅', icon: iconAbout },
	{ path: '/post/upload', label: '게시물 작성', icon: iconContact },
	{ path: '/Profile', label: '프로필', icon: iconProfile },
];

function TabNaviComponent() {
	return (
		<TabNavi>
			{tabs.map((tab, index) => (
				<Link key={index} to={tab.path}>
					<TabNaviButton>
						<TabNaviIcon src={tab.icon} alt={`${tab.label} icon`} /> {tab.label}
					</TabNaviButton>
				</Link>
			))}
		</TabNavi>
	);
	return (
		<TabNavi>
			{tabs.map((tab, index) => (
				<Link key={index} to={tab.path}>
					<TabNaviButton>
						<TabNaviIcon src={tab.icon} alt={`${tab.label} icon`} /> {tab.label}
					</TabNaviButton>
				</Link>
			))}
		</TabNavi>
	);
}

export default TabNaviComponent;
