import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
`;

const CartButton = styled.button`
	flex: 1;
	padding: 12px;
	font-size: 1.2rem;
	background-color: #ff5722;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

const BuyNowButton = styled.button`
	flex: 1;
	padding: 12px;
	font-size: 1.2rem;
	background-color: #ff3d00;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

const ProductButton = () => (
	<ButtonContainer>
		<CartButton>장바구니</CartButton>
		<BuyNowButton>바로 구매</BuyNowButton>
	</ButtonContainer>
);

export default ProductButton;
