import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ProductContainer = styled.section`
	padding: 2rem;
`;

const ProductItem = styled.div`
	margin-bottom: 1.5rem;
	padding: 1rem;
	border: 1px solid #ddd;
	border-radius: 8px;
`;

const ProductName = styled.h3`
	font-size: 1.8rem;
	margin: 0 0 0.5rem;
`;

const ProductPrice = styled.p`
	font-size: 1.4rem;
	color: #666;
	margin: 0;
`;

const ProfileProduct = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState('');
	const token = localStorage.getItem('authToken');
	const accountname = localStorage.getItem('accountname');

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

				setProducts(response.data.product);
			} catch (error) {
				setError('상품을 불러오는 데 실패했습니다.');
				console.error('Error fetching products:', error);
			}
		};

		if (accountname) {
			fetchProducts();
		} else {
			setError('계정 정보가 없습니다.');
		}
	}, [token, accountname]);

	return (
		<ProductContainer aria-label="상품 목록">
			{error && <p>{error}</p>}
			{products.length > 0
				? products.map((product) => (
						<ProductItem key={product.id}>
							<ProductName>{product.image}</ProductName>
							<ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
						</ProductItem>
					))
				: !error && <p>등록된 상품이 없습니다.</p>}
		</ProductContainer>
	);
};

export default ProfileProduct;
