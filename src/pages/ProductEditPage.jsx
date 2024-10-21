import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import Button from '../components/SharedComponents/Button';
import ProductForm from '../components/ProductComponents/ProductForm';

const Container = styled.div`
	width: 100%;
	margin: 0 auto;
	height: 100vh;
	height: 100dvh; //모바일 브라우저의 화면 높이 최적화
`;

const InnerContainer = styled.div`
	padding-top: 2.8rem;
`;

const ProductEditPage = () => {
	const { product_id } = useParams();
	const navigate = useNavigate();
	const token = localStorage.getItem('authToken');
	const [productData, setProductData] = useState({
		itemName: '',
		price: '',
		link: '',
		itemImage: '',
	});
	const [imageFile, setImageFile] = useState(null);
	const [nameError, setNameError] = useState('');
	const [priceError, setPriceError] = useState('');
	const [apiError, setApiError] = useState('');
	const [loading, setLoading] = useState(false);

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
				const { itemName, price, link, itemImage } = response.data.product;
				setProductData({ itemName, price, link, itemImage });
			} catch (error) {
				console.error('상품 정보 불러오기 실패:', error);
			}
		};
		fetchProductData();
	}, [product_id, token]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setProductData((prevData) => ({
					...prevData,
					itemImage: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleNameChange = (e) => {
		setProductData((prevData) => ({
			...prevData,
			itemName: e.target.value,
		}));
		setNameError('');
	};

	const handlePriceChange = (e) => {
		setProductData((prevData) => ({
			...prevData,
			price: e.target.value,
		}));
		setPriceError('');
	};

	const handleLinkChange = (e) => {
		setProductData((prevData) => ({
			...prevData,
			link: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setApiError('');

		if (productData.itemName.length < 2 || productData.itemName.length > 15) {
			setNameError('상품명은 2~15자 이내여야 합니다.');
			setLoading(false);
			return;
		}
		if (!/^\d+$/.test(productData.price)) {
			setPriceError('가격은 숫자만 입력 가능합니다.');
			setLoading(false);
			return;
		}

		try {
			let imageUrl = productData.itemImage; // 기본적으로 기존 이미지 URL로 초기화

			if (imageFile) {
				const formData = new FormData();
				formData.append('image', imageFile);

				const imageUploadResponse = await axios.post(
					'https://estapi.mandarin.weniv.co.kr/image/uploadfile',
					formData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'multipart/form-data',
						},
					}
				);
				imageUrl = `https://estapi.mandarin.weniv.co.kr/${imageUploadResponse.data.filename}`;
			}

			await axios.put(
				`https://estapi.mandarin.weniv.co.kr/product/${product_id}`,
				{
					product: {
						itemName: productData.itemName,
						price: Number(productData.price),
						link: productData.link,
						itemImage: imageUrl,
					},
				},
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
			setApiError('상품 수정에 실패했습니다.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<NavigationBar
				title="상품 편집"
				rightButton={
					<Button
						size="sm"
						type="button"
						onClick={handleSubmit}
						disabled={loading}
					>
						완료
					</Button>
				}
			/>
			<InnerContainer>
				<ProductForm
					image={productData.itemImage}
					handleImageChange={handleImageChange}
					name={productData.itemName}
					handleNameChange={handleNameChange}
					nameError={nameError}
					price={productData.price}
					handlePriceChange={handlePriceChange}
					priceError={priceError}
					link={productData.link}
					handleLinkChange={handleLinkChange}
					apiError={apiError}
					handleSave={handleSubmit}
					loading={loading}
					buttonText="수정"
				/>
			</InnerContainer>
		</Container>
	);
};

export default ProductEditPage;
