import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const CartButton = styled.button`
	flex: 1;
	padding: 1.8rem 0;
	font-size: 1.6rem;
	background-color: var(--white);
	color: var(--primary);
	border: 1px solid var(--primary);
`;

const BuyNowButton = styled.button`
	flex: 1;
	padding: 1.8rem 0;
	font-size: 1.6rem;
	background-color: var(--primary);
	color: var(--white);
	border: 1px solid transparent;
`;

const ProductButton = () => (
	<ButtonContainer>
		<CartButton>장바구니</CartButton>
		<BuyNowButton>바로 구매</BuyNowButton>
	</ButtonContainer>
);

export default ProductButton;
