// src/pages/ProductEditPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	max-width: 600px;
	margin: 0 auto;
	padding: 16px;
`;

const ProductEditPage = () => {
	const { product_id } = useParams(); // URL 파라미터에서 상품 ID를 가져옴
	const [productData, setProductData] = useState({
		itemName: '',
		price: '',
		link: '',
		itemImage: '',
	});
	const navigate = useNavigate();
	const token = localStorage.getItem('authToken');

	// 상품 데이터 가져오기
	useEffect(() => {
		const fetchProductData = async () => {
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
				setProductData(response.data.product);
			} catch (error) {
				console.error('상품 정보 불러오기 실패:', error);
			}
		};
		fetchProductData();
	}, [product_id, token]);

	// 입력 변경 처리
	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// 상품 수정 요청
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				`https://estapi.mandarin.weniv.co.kr/product/${product_id}`,
				{ product: productData },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			);
			alert('상품이 성공적으로 수정되었습니다.');
			navigate(`/product/${product_id}`); // 수정 후 상품 상세 페이지로 이동
		} catch (error) {
			console.error('상품 수정 실패:', error);
			alert('상품 수정에 실패했습니다.');
		}
	};

	return (
		<Container>
			<h2>상품 수정</h2>
			<form onSubmit={handleSubmit}>
				<label>
					상품명:
					<input
						type="text"
						name="itemName"
						value={productData.itemName}
						onChange={handleChange}
					/>
				</label>
				<label>
					가격:
					<input
						type="number"
						name="price"
						value={productData.price}
						onChange={handleChange}
					/>
				</label>
				<label>
					상품 링크:
					<input
						type="text"
						name="link"
						value={productData.link}
						onChange={handleChange}
					/>
				</label>
				<label>
					상품 이미지 URL:
					<input
						type="text"
						name="itemImage"
						value={productData.itemImage}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">저장</button>
			</form>
		</Container>
	);
};

export default ProductEditPage;
