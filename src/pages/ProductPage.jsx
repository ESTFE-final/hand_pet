import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import {
	ProductImage,
	ProductName,
	ProductPrice,
} from '../components/ProductComponents/ProductDetail';
import ProductUser from '../components/ProductComponents/ProductUser';
import ProductButton from '../components/ProductComponents/ProductButton';
import QuantitySelector from '../components/ProductComponents/QuantitySelector';
import TotalPrice from '../components/ProductComponents/TotalPrice';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';

const Container = styled.div`
	width: 100%;
	max-width: 768px;
	margin: 0 auto;
	padding: 16px;
`;

const ProductPage = () => {
	const { product_id } = useParams();
	const [product, setProduct] = useState({});
	const [error, setError] = useState('');
	const [quantity, setQuantity] = useState(1);
	const token = localStorage.getItem('authToken');

	useEffect(() => {
		const fetchProductDetail = async () => {
			try {
				const response = await axios.get(
					`https://estapi.mandarin.weniv.co.kr/product/detail/${product_id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setProduct(response.data.product);
			} catch (error) {
				setError('상품 정보를 불러오는 데 실패했습니다.');
				console.error(
					'Error fetching product details:',
					error.response ? error.response.data : error.message
				);
			}
		};

		if (product_id) {
			fetchProductDetail();
		}
	}, [product_id, token]);

	const handleIncreaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	if (error) {
		return (
			<Container>
				<p>{error}</p>
			</Container>
		);
	}

	if (!product || !product.author) {
		return (
			<Container>
				<p>상품 정보를 불러오는 중입니다...</p>
			</Container>
		);
	}

	const totalPrice = product.price * quantity;

	return (
		<>
			<NavigationBar />
			<Container>
				<ProductImage src={product.itemImage} alt={product.itemName} />
				<ProductUser author={product.author} />
				<ProductName>{product.itemName}</ProductName>
				<ProductPrice>{`${product.price.toLocaleString()}원`}</ProductPrice>

				<QuantitySelector
					quantity={quantity}
					onIncrease={handleIncreaseQuantity}
					onDecrease={handleDecreaseQuantity}
				/>

				<TotalPrice amount={totalPrice} />

				<ProductButton />
			</Container>
		</>
	);
};

export default ProductPage;
