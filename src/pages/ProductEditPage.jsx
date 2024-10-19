import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
	NavigationBar,
	Input,
} from '../components/SharedComponents/CommonComponents';
import Button from '../components/SharedComponents/Button';
import uploadIcon from '../assets/icons/upload-file.svg';

const InputBox = ({ id, type, name, placeholder, error, onChange, value }) => (
	<AddProductInputItem>
		<AddProductLabel htmlFor={id}>{name}</AddProductLabel>
		<AddProductInput
			id={id}
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
		/>
		{error && <ErrorMessage>{error}</ErrorMessage>}
	</AddProductInputItem>
);

const Container = styled.div`
	width: 100%;
	margin: 0 auto;
`;

const InnerContainer = styled.div`
	padding-top: 2.8rem;
`;

const AddProductContent = styled.div`
	padding: 3rem 3.4rem 0;
`;

const AddProductInputItem = styled.div`
	margin-bottom: 3rem;
	&:last-child {
		margin-bottom: 0;
	}
`;

const AddProductLabel = styled.label`
	padding-left: 2.2rem;
	font-size: 2.4rem;
	color: #666;
`;

const AddProductInput = styled(Input)`
	margin-top: 1.5rem;
	display: block;
`;

const AddProductImageContent = styled.div`
	position: relative;
	margin-bottom: 6rem;
`;

const AddProductImageLabel = styled.label`
	position: absolute;
	bottom: 24px;
	right: 24px;
	display: block;
	background: url(${uploadIcon}) no-repeat center / 100%;
	width: 72px;
	height: 72px;
	border-radius: 50%;
	cursor: pointer;
`;

const AddProductImageInput = styled.input`
	display: none;
`;

const AddProductPreviewImage = styled.img`
	width: 100%;
	height: auto;
	max-height: 408px;
	object-fit: cover;
	border-radius: 2rem;
	overflow: hidden;
	margin-top: 1.5rem;
`;

const AddProductPlaceholderImage = styled.div`
	width: 100%;
	height: 408px;
	background-color: #f2f2f2;
	border: 1px solid var(--gray);
	border-radius: 2rem;
	margin-top: 1.5rem;
`;

const ErrorMessage = styled.p`
	color: var(--primary);
	font-size: 2.4rem;
	padding: 1.4rem 2rem 0 4rem;
`;

const ProductEditPage = () => {
	const { product_id } = useParams();
	const [productData, setProductData] = useState({
		itemName: '',
		price: '',
		link: '',
		itemImage: '',
	});
	const navigate = useNavigate();
	const token = localStorage.getItem('authToken');

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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProductData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

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
			navigate(`/product/${product_id}`);
		} catch (error) {
			console.error('상품 수정 실패:', error);
			alert('상품 수정에 실패했습니다.');
		}
	};

	return (
		<>
			<Container>
				<NavigationBar
					title="상품 편집"
					rightButton={
						<Button size="sm" type="button" onClick={handleSubmit}>
							저장
						</Button>
					}
				/>
				<InnerContainer>
					<AddProductContent>
						<InputBox
							type="text"
							name="상품명"
							value={productData.itemName}
							onChange={handleChange}
						/>

						<input
							type="number"
							name="가격"
							value={productData.price}
							onChange={handleChange}
						/>

						<input
							type="text"
							name="판매 링크"
							value={productData.link}
							onChange={handleChange}
						/>

						<input
							type="text"
							name="itemImage"
							value={productData.itemImage}
							onChange={handleChange}
						/>
					</AddProductContent>
				</InnerContainer>
			</Container>
		</>
	);
};

export default ProductEditPage;
