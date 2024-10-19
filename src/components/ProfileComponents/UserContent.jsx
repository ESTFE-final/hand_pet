import React, { useState } from 'react';
import styled from 'styled-components';
import ProductTab from './ProfileProduct';
import PostTab from './ProfilePost';

const ProfileUserContent = styled.article`
	margin-top: 48px;
`;

const TabNav = styled.nav`
	display: flex;
	justify-content: space-around;
	border-bottom: 2px solid var(--gray);
`;

const TabButton = styled.button`
	padding: 0 60px 20px 60px;
	font-size: 3rem;
	font-weight: bold;
	position: relative;
	color: ${(props) => (props.active ? 'var(--primary)' : 'inherit')};

	&::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 100%;
		height: 6px;
		background-color: var(--primary);
		border-radius: 60px;
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
					<ProductTab accountname={accountname} />
				) : (
					<PostTab accountname={accountname} />
				)}
			</ContentArea>
		</ProfileUserContent>
	);
};

export default UserContent;
