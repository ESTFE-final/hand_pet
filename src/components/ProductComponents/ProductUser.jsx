import React from 'react';
import styled from 'styled-components';

const ProductUserContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
`;

const StoreImage = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	margin-right: 1.2rem;
`;

const StoreDetails = styled.div`
	display: flex;
	flex-direction: column;
`;

const StoreName = styled.p`
	font-size: 1.2rem;
	line-height: 1.4;
`;

const AccountName = styled.p`
	font-size: .9rem;
	color: var(--gray-300);
`;

const ProductUser = ({ author }) => (
	<ProductUserContainer>
		<StoreImage
			src={author.image || 'default_image_url.jpg'}
			alt={author.username || 'Default Username'}
		/>
		<StoreDetails>
			<StoreName>{author.username}</StoreName>
			<AccountName>@{author.accountname}</AccountName>
		</StoreDetails>
	</ProductUserContainer>
);

export default ProductUser;
