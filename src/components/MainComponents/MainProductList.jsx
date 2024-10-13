import React, { useState } from 'react';
import styled from 'styled-components';
import Product1 from '../../icons/img-main-category(1).png';
import Product2 from '../../icons/img-main-category(2).png';
import Cart from '../../icons/icon-main-shopping-cart.svg';

const Container = styled.div`
	width: 90%;
	margin: 52px auto;
`;

const Title = styled.span`
	font-size: 3rem;
`;

const ButtonContainer = styled.div`
	margin: 36px auto;
`;

const Button = styled.button`
	padding: 10px 15px;
	margin: 0 5px;
	height: 44px;
	line-height: 1.5;
	background-color: ${(props) => (props.isSelected ? '#000' : '#f3f3f5')};
	color: ${(props) => (props.isSelected ? '#fff' : '#6C6D7A')};
	cursor: pointer;
	font-size: 2rem;
	border-radius: 20px;
	&:hover {
		background-color: #000;
		color: #fff;
	}
`;

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

const MainProductList = () => {
	const [selected, setSelected] = useState('인기순');
	const products = [
		{ img: Product1, name: '고구마 야채 연어 사료 200g', price: '35,000원' },
		{ img: Product2, name: '필드게인 양고기 1kg/3kg/5kg', price: '35,000원' },
		{ img: Product1, name: '고구마 야채 연어 사료 200g', price: '35,000원' },
		{ img: Product2, name: '필드게인 양고기 1kg/3kg/5kg', price: '35,000원' },
		{ img: Product1, name: '고구마 야채 연어 사료 200g', price: '35,000원' },
		{ img: Product2, name: '필드게인 양고기 1kg/3kg/5kg', price: '35,000원' },
	];

	const options = [
		'인기순',
		'신상품',
		'판매수 많은 순',
		'낮은 가격순',
		'높은 가격순',
	];

	return (
		<Container>
			<Title>판매 중인 상품</Title>

			<ButtonContainer>
				{options.map((option) => (
					<Button
						key={option}
						isSelected={selected === option}
						onClick={() => setSelected(option)}
					>
						{option}
					</Button>
				))}
			</ButtonContainer>

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
		</Container>
	);
};

export default MainProductList;
