import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/SharedComponents/Button';
import {
	NavigationBar,
	Input,
} from '../components/SharedComponents/CommonComponents';
import axios from 'axios';
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
				<AddProductContent>
					<AddProductImageContent>
						<AddProductLabel as="p">이미지 등록</AddProductLabel>
						<AddProductImageLabel htmlFor="image" />
						{image ? (
							<AddProductPreviewImage src={image} alt="상품 미리보기" />
						) : (
							<AddProductPlaceholderImage />
						)}
						<AddProductImageInput
							id="image"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
						/>
					</AddProductImageContent>
					<InputBox
						id="productName"
						type="text"
						name="상품명"
						placeholder="2~15자 이내여야 합니다."
						onChange={handleNameChange}
						value={name}
						error={nameError}
					/>
					<InputBox
						id="productPrice"
						type="text"
						name="가격"
						placeholder="숫자만 입력 가능합니다."
						onChange={handlePriceChange}
						value={price}
						error={priceError}
					/>
					<InputBox
						id="productLink"
						type="text"
						name="판매 링크"
						placeholder="URL을 입력해 주세요."
						onChange={handleLinkChange}
						value={link}
					/>
					{apiError && <ErrorMessage>{apiError}</ErrorMessage>}
				</AddProductContent>
			</InnerContainer>
		</Container>
	);
};

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

export default AddProductPage;
