import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ProductList from './ProductList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainCategory from './MainCategory';

// 로딩 스피너로 적용  try catch finally  그리고 setloading true false 그리고 if loading으로 처리

const spin = keyframes`
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-left-color: #22a6b3;
	border-radius: 50%;
	width: 36px;
	height: 36px;
	animation: ${spin} 1s linear infinite;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Container = styled.div`
	width: 100%;
	margin: 2.4rem auto;
`;

const Title = styled.span`
	font-size: 1.8rem;
`;

const ButtonContainer = styled.div`
	margin: 1.8rem auto;
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
	margin: 0 0.4rem;
	background-color: ${(props) => (props.isSelected ? '#000' : '#f3f3f5')};
	color: ${(props) => (props.isSelected ? '#fff' : '#6C6D7A')};
	cursor: pointer;
	font-size: 1rem;
	border-radius: 20px;

	&:hover {
		background-color: #000;
		color: #fff;
	}
	&:first-child{
		margin-left: 0;
	};
`;

const Productscontent = styled.section`
	padding: 2.6rem 2.4rem;
`

const MainProductList = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const token = localStorage.getItem('authToken');
	const accountname = localStorage.getItem('accountname');
	const [selectedSort, setSelectedSort] = useState('인기순');
	const [selectedCategory, setSelectedCategory] = useState('');
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	const options = [
		'인기순',
		'신상품',
		'판매수 많은 순',
		'낮은 가격순',
		'높은 가격순',
	];

	const sortProducts = (products, order) => {
		switch (order) {
			case '높은 가격순':
				return [...products].sort((a, b) => b.price - a.price);
			case '낮은 가격순':
				return [...products].sort((a, b) => a.price - b.price);
			default:
				return products;
		}
	};

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
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

				const sortedProducts = sortProducts(
					response.data.product,
					selectedSort
				);
				setProducts(sortedProducts);
				setFilteredProducts(sortedProducts);
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setLoading(false);
			}
		};

		if (accountname) {
			fetchProducts();
		}
	}, [token, accountname, selectedSort]);

	useEffect(() => {
		if (selectedCategory) {
			console.log('Selected Category:', selectedCategory);
			const filtered = products.filter((product) => {
				if (selectedCategory === '육포·말이') {
					return product.itemName.includes('육포');
				}
				if (selectedCategory === '수제사료') {
					return product.itemName.includes('사료');
				}
				if (selectedCategory === '천연수제껌') {
					return product.itemName.includes('껌');
				}
				if (selectedCategory === '쿠키') {
					return product.itemName.includes('쿠키');
				}
				if (selectedCategory === '케이크') {
					return product.itemName.includes('케이크');
				}
				if (selectedCategory === '파우더') {
					return product.itemName.includes('파우더');
				}
				if (selectedCategory === '세일') {
					return true;
				}
				return true;
			});
			console.log('Filtered Products:', filtered);
			setFilteredProducts(filtered);
		} else {
			setFilteredProducts(products);
		}
	}, [selectedCategory, products]);

	const handleProductClick = (productId) => {
		navigate(`/product/${productId}`);
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<Container>
			<MainCategory setSelectedCategory={setSelectedCategory} />
			<Productscontent>
				<Title>판매 중인 상품</Title>
				<ButtonContainer>
					{options.map((option) => (
						<Button
							key={option}
							isSelected={selectedSort === option}
							onClick={() => setSelectedSort(option)}
						>
							{option}
						</Button>
					))}
				</ButtonContainer>
				<ProductList
					products={filteredProducts.map((product) => ({
						id: product.id,
						img: product.itemImage,
						name: product.itemName,
						price: `${product.price.toLocaleString()}원`,
					}))}
					onProductClick={handleProductClick}
				/>
			</Productscontent>
		</Container>
	);
};

export default MainProductList;
