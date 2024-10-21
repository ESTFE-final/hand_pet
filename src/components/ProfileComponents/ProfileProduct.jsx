import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductList from '../MainComponents/ProductList';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../SharedComponents/Button';
import { LoadingSpinner } from '../SharedComponents/CommonComponents';

const Container = styled.div`
	width: 100%;
	padding: 25px 23px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ErrorMessage = styled.p`
	padding-top: 26px;
	font-size: 1.6rem;
`;

const SpinnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh; /* 화면 전체 높이 */
`;

const ProfileProduct = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState('');
	const [page, setPage] = useState(1);
	const [limit] = useState(6); // 한 페이지당 보여줄 게시물 수
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const { accountname: paramAccountname } = useParams();
	const token = localStorage.getItem('authToken');
	const localAccountname = localStorage.getItem('accountname');
	const navigate = useNavigate();

	const accountname = paramAccountname || localAccountname;

	const fetchProducts = useCallback(async () => {
		if (!accountname) {
			setError('계정 정보가 없습니다.');
			return;
		}

		setIsLoading(true);

		try {
			const response = await axios.get(
				`https://estapi.mandarin.weniv.co.kr/product/${accountname}?limit=${limit}&skip=${(page - 1) * limit}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			);

			const fetchedProducts = response.data.product;

			setProducts((prevProducts) => {
				const newProducts = [...prevProducts, ...fetchedProducts];
				return newProducts.filter(
					(product, index, self) =>
						index === self.findIndex((t) => t.id === product.id)
				);
			});

			setHasMore(fetchedProducts.length === limit);
		} catch (error) {
			setError('상품을 불러오는 데 실패했습니다.');
			console.error('Error fetching products:', error);
		} finally {
			setIsLoading(false);
		}
	}, [token, accountname, page, limit]);

	useEffect(() => {
		setProducts([]);
		setPage(1);
		setHasMore(true);
		fetchProducts();
	}, [accountname, fetchProducts]);

	const handleProductClick = (productId) => {
		console.log('product 아이디 확인:', productId);
		navigate(`/product/${productId}`);
	};

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	return (
		<Container>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			{isLoading ? (
				<SpinnerContainer>
					<LoadingSpinner />
				</SpinnerContainer>
			) : products.length > 0 ? (
				<>
					<ProductList
						products={products.map((product) => ({
							id: product.id,
							img: product.itemImage,
							name: product.itemName,
							price: `${product.price.toLocaleString()}원`,
						}))}
						onProductClick={handleProductClick}
					/>
					{hasMore && (
						<Button size="more" onClick={loadMore} disabled={isLoading}>
							{isLoading ? '로딩 중...' : '더보기'}
						</Button>
					)}
				</>
			) : (
				!error && (
					<SpinnerContainer>
						<LoadingSpinner />
					</SpinnerContainer>
				)
			)}
		</Container>
	);
};

export default ProfileProduct;
