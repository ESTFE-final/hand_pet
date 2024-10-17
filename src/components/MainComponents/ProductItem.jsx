import React from 'react';
import styled from 'styled-components';

const ProductWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	border-radius: 8px;
	position: relative;
	border: 1px solid black;
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

const ProductItem = ({ product }) => {
	return (
		<ProductWrapper>
			<ProductImage src={product.img} alt={product.name} />
			<ProductName>{product.name}</ProductName>
			<ProductPrice>{product.price}</ProductPrice>
		</ProductWrapper>
	);
};

export default ProductItem;
