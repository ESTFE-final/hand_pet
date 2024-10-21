import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import axios from 'axios';
import ProductForm from '../components/ProductComponents/ProductForm';

const AddProductPage = () => {
	const navigate = useNavigate();
	const [image, setImage] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [link, setLink] = useState('');
	const [nameError, setNameError] = useState('');
	const [priceError, setPriceError] = useState('');
	const [apiError, setApiError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setImage(URL.createObjectURL(file));
			setImageFile(file);
		}
	};

	const handleNameChange = (event) => {
		const value = event.target.value.trim();
		setName(value);
		setNameError(
			value.length < 2 || value.length > 15
				? '상품명은 2~15자 이내여야 합니다.'
				: ''
		);
	};

	const handlePriceChange = (event) => {
		const value = event.target.value.replace(/,/g, '');
		if (isNaN(value) || value === '' || Number(value) < 1) {
			setPriceError('가격은 1원 이상이어야 하며 숫자로 입력해야 합니다.');
		} else {
			setPriceError('');
			setPrice(Number(value).toLocaleString('en-US'));
		}
	};

	const handleLinkChange = (event) => {
		setLink(event.target.value.trim());
	};

	const isFormValid = () => {
		return (
			name.length >= 2 &&
			name.length <= 15 &&
			!priceError &&
			price !== '' &&
			link !== '' &&
			imageFile
		);
	};

	const handleSave = async () => {
		if (!isFormValid()) {
			setApiError('모든 필드를 올바르게 입력해 주세요.');
			return;
		}

		setLoading(true);
		let imageUrl = '';

		try {
			const formData = new FormData();
			formData.append('image', imageFile);

			const uploadResponse = await axios.post(
				'https://estapi.mandarin.weniv.co.kr/image/uploadfile',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			const filename = uploadResponse.data.filename;
			imageUrl = `https://estapi.mandarin.weniv.co.kr/${filename}`;
		} catch (error) {
			setApiError('이미지 업로드 중 문제가 발생했습니다.');
			setLoading(false);
			return;
		}

		const productData = {
			product: {
				itemName: name,
				price: Number(price.replace(/,/g, '')),
				link: link,
				itemImage: imageUrl,
			},
		};

		try {
			await axios.post(
				'https://estapi.mandarin.weniv.co.kr/product',
				productData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authToken')}`,
						'Content-Type': 'application/json',
					},
				}
			);
			navigate('/profile');
		} catch (error) {
			setApiError('상품 등록 중 문제가 발생했습니다.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<NavigationBar
				title="상품 등록"
				rightButton={
					<Button
						size="sm"
						type="button"
						onClick={handleSave}
						disabled={loading}
					>
						{loading ? '저장 중...' : '저장'}
					</Button>
				}
			/>
			<h1 className="sr-only">판매 상품 등록 페이지입니다</h1>
			<InnerContainer>
				<ProductForm
					image={image}
					handleImageChange={handleImageChange}
					name={name}
					handleNameChange={handleNameChange}
					nameError={nameError}
					price={price}
					handlePriceChange={handlePriceChange}
					priceError={priceError}
					link={link}
					handleLinkChange={handleLinkChange}
					apiError={apiError}
					handleSave={handleSave}
					loading={loading}
					buttonText="저장"
				/>
			</InnerContainer>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	margin: 0 auto;
	height: ;
`;

const InnerContainer = styled.div`

`;

export default AddProductPage;
