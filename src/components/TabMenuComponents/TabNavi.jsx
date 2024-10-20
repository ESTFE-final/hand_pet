import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
	justify-content: space-around;
	align-items: center;
	width: 100%;
	max-width: 480px;
	bottom: 0;
	height: 60px;
	background-color: #ffffff;
	border-top: 1px solid #e5e5e5;
	z-index: 10;
`;

const StyledNavLink = styled(NavLink)``;

// Button 스타일
const TabNaviButton = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	/* width: 107px; */
	font-family: 'Gmarket Sans TTF';
	font-size: 1.2rem;
	color: ${(props) =>
		props.isActive || props.isHovered ? '#FF3239' : '#767676'};
	word-break: keep-all;
	transition: all 0.2s ease;

	&:hover {
		color: #ff3239;
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
		path: '/About',
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

	return (
		<TabNavi>
			{tabs.map((tab, index) => (
				<StyledNavLink key={index} to={tab.path}>
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
