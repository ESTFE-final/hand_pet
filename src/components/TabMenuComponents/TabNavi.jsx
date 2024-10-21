import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

// SVG 이미지 import
import iconMain from '../../assets/icons/icon-home.svg';
import iconMainFill from '../../assets/icons/icon-home-fill.svg';
import iconAbout from '../../assets/icons/icon-message-circle.svg';
import iconAboutFill from '../../assets/icons/icon-message-circle-fill.svg';
import iconContact from '../../assets/icons/icon-edit.svg';
import iconContactFill from '../../assets/icons/icon-edit-fill.svg';
import iconProfile from '../../assets/icons/icon-user.svg';
import iconProfileFill from '../../assets/icons/icon-user-fill.svg';
import iconFeed from '../../assets/icons/icon-tab-feed.svg';
import iconFeedFill from '../../assets/icons/icon-tab-feed-fill.svg';

// Container 스타일
const TabNavi = styled.div`
	display: flex;
	position: fixed;
	bottom: 0;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	max-width: 480px;
	left: 0;
	right: 0;
	margin: 0 auto;
	height: 60px;
	background-color: #ffffff;
	border-top: 1px solid var(--gray);
	z-index: 10;
`;

const StyledNavLink = styled(NavLink)`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

// Button 스타일
const TabNaviButton = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 4px;
	width: 100%;
	height: 100%;
	font-size: 1rem;
	color: ${(props) =>
		props.isActive || props.isHovered ? '#FF3239' : '#767676'};
	word-break: keep-all;
	transition: all 0.2s ease;

	&:hover {
		color: #ff3239;
		animation: clickAnimation 0.4s ease;
	}

	&:active {
		animation: clickAnimation 0.4s ease;
	}

	@keyframes clickAnimation {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}
`;

// Icon 스타일
const TabNaviIcon = styled.img`
	// Icon 스타일
	width: 24px;
	height: 24px;
`;

// 탭 정보를 담은 배열
const tabs = [
	{
		path: '/',
		label: '홈',
		icon: iconMain,
		activeIcon: iconMainFill,
	},
	{
		path: '/chatlist',
		label: '채팅',
		icon: iconAbout,
		activeIcon: iconAboutFill,
	},
	{
		path: '/post',
		label: '피드',
		icon: iconFeed,
		activeIcon: iconFeedFill,
	},
	{
		path: '/post/upload',
		label: '게시물 작성',
		icon: iconContact,
		activeIcon: iconContactFill,
	},
	{
		path: '/profile',
		label: '프로필',
		icon: iconProfile,
		activeIcon: iconProfileFill,
	},
];

function TabNaviComponent() {
	const [hoverIndex, setHoverIndex] = useState(null);
	const location = useLocation();

	const isProfileActive = (path) => {
		return location.pathname.startsWith('/profile');
	};

	return (
		<TabNavi>
			{tabs.map((tab, index) => (
				<StyledNavLink
					key={index}
					to={tab.path}
					isActive={
						tab.path === '/profile'
							? isProfileActive
							: (match, location) => location.pathname === tab.path
					}
				>
					{({ isActive }) => (
						<TabNaviButton
							isActive={isActive}
							isHover={hoverIndex === index}
							onMouseEnter={() => setHoverIndex(index)}
							onMouseLeave={() => setHoverIndex(null)}
						>
							<TabNaviIcon
								src={
									isActive || hoverIndex === index ? tab.activeIcon : tab.icon
								}
								alt={`${tab.label} icon`}
							/>
							{tab.label}
						</TabNaviButton>
					)}
				</StyledNavLink>
			))}
		</TabNavi>
	);
}

export default TabNaviComponent;
