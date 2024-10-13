import React from 'react';
import styled from 'styled-components';
import Cart from '../../assets/icons/icon-main-shopping-cart.svg';

const ProductContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;
	cursor: pointer;
`;

const ProductWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	border-radius: 8px;
	position: relative;
`;

const ProductImage = styled.img`
	object-fit: cover;
	margin-bottom: 10px;
`;

const ProductName = styled.p`
	font-size: 2rem;
	margin-bottom: 5px;
`;

const ProductPrice = styled.p`
	font-size: 3rem;
	font-weight: bold;
`;

const ShoppingCart = styled.img`
	position: absolute;
	right: 25px;
	bottom: 110px;
	width: 72px;
	height: 72px;
	cursor: pointer;
`;

const ProductList = ({ products }) => {
	return (
		<ProductContainer>
			{products.map((product, index) => (
				<ProductWrapper key={index}>
					<ProductImage src={product.img} alt={product.name} />
					<ShoppingCart src={Cart} />
					<ProductName>{product.name}</ProductName>
					<ProductPrice>{product.price}</ProductPrice>
				</ProductWrapper>
			))}
		</ProductContainer>
	);
};

export default ProductList;
