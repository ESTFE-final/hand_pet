import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductList from '../MainComponents/ProductList';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../SharedComponents/Button';

const Container = styled.div`
	width: 90%;
	margin: 52px auto;
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 1.2rem;
`;

const ProfileProduct = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState('');
	const [page, setPage] = useState(1);
	const [limit] = useState(6); // 한 페이지당 보여줄 게시물 수
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
	const { accountname: paramAccountname } = useParams(); // URL에서 accountname을 가져옴
	const token = localStorage.getItem('authToken');
	const localAccountname = localStorage.getItem('accountname'); // 로컬 스토리지에서 accountname 가져오기
	const navigate = useNavigate();

	// accountname 선택 (URL에서 가져오거나 로컬 스토리지에서 가져옴)
	const accountname = paramAccountname || localAccountname;

	const fetchProducts = useCallback(async () => {
		if (!accountname) {
			setError('계정 정보가 없습니다.');
			return;
		}

		setIsLoading(true); // 로딩 시작

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
			setIsLoading(false); // 로딩 끝
		}
	}, [token, accountname, page, limit]);

	useEffect(() => {
		setProducts([]); // 새로운 accountname으로 바뀔 때마다 상품 목록 초기화
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
			{products.length > 0 ? (
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
				!error && <p>등록된 상품이 없습니다.</p>
			)}
		</Container>
	);
};

export default ProfileProduct;
