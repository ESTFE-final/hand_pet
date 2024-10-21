import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileProduct from './ProfileProduct';
import PostTab from './ProfilePost';

const ProfileUserContent = styled.article`
	margin-top: 24px;
`;

const TabNav = styled.nav`
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid var(--gray);
`;

const TabButton = styled.button`
	padding: 0 30px 10px 30px;
	font-size: 1.6rem;
	font-weight: bold;
	position: relative;
	color: ${(props) => (props.active ? 'var(--primary)' : 'inherit')};

	&::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 100%;
		height: 3px;
		background-color: var(--primary);
		border-radius: 30px;
		transform: scaleX(${(props) => (props.active ? 1 : 0)});
		transition: transform 0.3s ease;
	}
`;

const ContentArea = styled.div``;

const UserContent = ({ accountname }) => {
	const [activeTab, setActiveTab] = useState('product');

	return (
		<ProfileUserContent>
			<TabNav aria-label="콘텐츠 탭">
				<TabButton
					type="button"
					active={activeTab === 'product'}
					onClick={() => setActiveTab('product')}
				>
					상품
				</TabButton>
				<TabButton
					type="button"
					active={activeTab === 'post'}
					onClick={() => setActiveTab('post')}
				>
					게시물
				</TabButton>
			</TabNav>

			<ContentArea>
				{activeTab === 'product' ? (
					<ProfileProduct accountname={accountname} />
				) : (
					<PostTab accountname={accountname} />
				)}
			</ContentArea>
		</ProfileUserContent>
	);
};

export default UserContent;
