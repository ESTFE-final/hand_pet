import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductItem from '../MainComponents/ProductItem';

const Container = styled.div`
	width: 90%;
	margin: 52px auto;
`;

const ProductContainer = styled.section`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;
	cursor: pointer;
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 1.2rem;
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

				console.log('Fetched products:', response.data.product);

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
		<Container>
			<ProductContainer aria-label="상품 목록">
				{error && <ErrorMessage>{error}</ErrorMessage>}
				{products.length > 0
					? products.map((product) => (
							<ProductItem
								key={product.id}
								product={{
									img: product.itemImage,
									name: product.itemName,
									price: `${product.price.toLocaleString()}원`,
								}}
							/>
						))
					: !error && <p>등록된 상품이 없습니다.</p>}
			</ProductContainer>
		</Container>
	);
};

export default ProfileProduct;
