import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductList from './ProductList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainCategory from './MainCategory';

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
	const [filteredProducts, setFilteredProducts] = useState([]);
	const token = localStorage.getItem('authToken');
	const accountname = localStorage.getItem('accountname');
	const [selectedSort, setSelectedSort] = useState('인기순');
	const [selectedCategory, setSelectedCategory] = useState('');
	const navigate = useNavigate();

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

	return (
		<Container>
			<MainCategory setSelectedCategory={setSelectedCategory} />
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
		</Container>
	);
};

export default MainProductList;
