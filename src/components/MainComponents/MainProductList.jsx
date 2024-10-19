import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductList from './ProductList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const MainProductList = () => {
	const [products, setProducts] = useState([]);
	const token = localStorage.getItem('authToken');
	const accountname = localStorage.getItem('accountname');
	const [selected, setSelected] = useState('인기순');
	const navigate = useNavigate();

	const options = [
		'인기순',
		'신상품',
		'판매수 많은 순',
		'낮은 가격순',
		'높은 가격순',
	];

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					`https://estapi.mandarin.weniv.co.kr/product/${accountname}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);

				console.log('Fetched products:', response.data.product);

				setProducts(response.data.product);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		if (accountname) {
			fetchProducts();
		}
	}, [token, accountname]);

	const handleProductClick = (productId) => {
		console.log('product 아이디 확인:', productId);
		navigate(`/product/${productId}`);
	};

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
			<ProductList
				products={products.map((product) => ({
					id: product.id,
					img: product.itemImage,
					name: product.itemName,
					price: `${product.price.toLocaleString()}원`,
				}))}
				onProductClick={handleProductClick}
			/>
		</Container>
	);
};

export default MainProductList;
