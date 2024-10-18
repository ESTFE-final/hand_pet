import React from 'react';
import styled from 'styled-components';

const ProductUserContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;
`;

const StoreImage = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 10px;
`;

const StoreDetails = styled.div`
	display: flex;
	flex-direction: column;
`;

const StoreName = styled.p`
	font-size: 1.2rem;
	font-weight: bold;
	margin: 0;
`;

const AccountName = styled.p`
	font-size: 1rem;
	color: gray;
	margin: 0;
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
