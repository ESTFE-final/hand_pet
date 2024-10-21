import React from 'react';
import styled from 'styled-components';
import Cart from '../../assets/icons/icon-main-shopping-cart.svg';

const ProductContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const ProductWrapper = styled.a`
	width: calc((100% - 14px) / 2);
	margin-bottom: 2.4rem;
`;

const ProductImage = styled.img`
	object-fit: cover;
	aspect-ratio: 1;
	width: 100%;
	height: 100%;
`;

const ProductName = styled.p`
	font-size: 1.2rem;
	margin-bottom: 5px;
`;

const ProductPrice = styled.p`
	font-size: 1.6rem;
	font-weight: bold;
`;

const ShoppingCart = styled.button`
	position: absolute;
	right: 8px;
	bottom: 8px;
	width: 36px;
	height: 36px;
	cursor: pointer;
	background: none;
	border: none;
	padding: 0;
	
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url(${Cart});
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
`;

const ProductImageBox = styled.div`
	position: relative;
	border-radius: 1rem;
	overflow: hidden;
	width: 100%;
`;

const ProductInfo = styled.div`
	margin-top: 1.4rem;
`

const ProductList = ({ products, onProductClick }) => {
	return (
		<ProductContainer>
			{products.map((product, index) => (
				<ProductWrapper key={index} onClick={() => onProductClick(product.id)}>
					<ProductImageBox>
						<ProductImage src={product.img} alt={product.name} />
						<ShoppingCart aria-label="장바구니 버튼" />
					</ProductImageBox>
					<ProductInfo>
						<ProductName>{product.name}</ProductName>
						<ProductPrice>{product.price}</ProductPrice>
					</ProductInfo>
				</ProductWrapper>
			))}
		</ProductContainer>
	);
};

export default ProductList;
