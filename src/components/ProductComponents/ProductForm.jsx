import React from 'react';
import styled from 'styled-components';
import uploadIcon from '../../assets/icons/upload-file.svg';
import { Input } from '../SharedComponents/CommonComponents';

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

const AddProductContent = styled.div`
	padding: 3rem 3.4rem 0;
`;

const AddProductInputItem = styled.div`
	margin-bottom: 1.5rem;
	&:last-child {
		margin-bottom: 0;
	}
`;

const AddProductLabel = styled.label`
	padding-left: 1.1rem;
	font-size: 1.2rem;
	color: var(--gray-300);
`;

const AddProductInput = styled(Input)`
	margin-top: 1rem;
	display: block;
`;

const AddProductImageContent = styled.div`
	position: relative;
	margin-bottom: 3rem;
`;

const AddProductImageLabel = styled.label`
	position: absolute;
	bottom: 12px;
	right: 12px;
	display: block;
	background: url(${uploadIcon}) no-repeat center / 100%;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	cursor: pointer;
`;

const AddProductImageInput = styled.input`
	display: none;
`;

const AddProductPreviewImage = styled.img`
	width: 100%;
	height: auto;
	max-height: 204px;
	object-fit: cover;
	border-radius: 1rem;
	overflow: hidden;
	margin-top: 1.8rem;
`;

const AddProductPlaceholderImage = styled.div`
	width: 100%;
	height: 204px;
	background-color: #f2f2f2;
	border: 1px solid var(--gray);
	border-radius: 1rem;
	margin-top: 1rem;
`;

const ErrorMessage = styled.p`
	color: var(--primary);
	font-size: 1.2rem;
	padding: .7rem 1.2rem 0 1.2rem;
`;

const ProductForm = ({
	image,
	handleImageChange,
	name,
	handleNameChange,
	nameError,
	price,
	handlePriceChange,
	priceError,
	link,
	handleLinkChange,
	apiError,
	handleSave,
	loading,
	buttonText,
}) => (
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
);

export default ProductForm;
