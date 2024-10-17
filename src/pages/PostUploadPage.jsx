import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import uploadIcon from '../assets/icons/upload-file.svg';
import imageCloseIcon from '../assets/icons/icon-image-close.svg';

const PostUploadWrapper = styled.section`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const CustomNavigationBar = styled(NavigationBar)`
	border: none;
	margin-bottom: 64px;
`;

const UploadButton = styled.button`
	background-color: var(--gray-100);
	color: var(--white);
	padding: 15px 50px;
	border-radius: 64px;
	font-size: 2.8rem;
	transition: all 0.3s ease;

	&:hover {
		background-color: var(--primary);
	}
`;

const PostUploadContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 0 32px;
	padding-right: ${(props) => (props.hasImages ? '0' : '32px')};
`;

const PostTextDiv = styled.div`
	width: calc(100% - 32px);
	min-height: 150px;
	font-size: 2.8rem;
	border: none;
	outline: none;
	overflow: auto;
	margin-bottom: 32px;

	&:empty:before {
		content: attr(data-placeholder);
		color: var(--gray-200);
	}
`;

// 이미지 프리뷰
const ImagePreviewContainer = styled.div`
	width: ${(props) => (props.isSingle ? 'calc(100% - 32px)' : '100%')};
	height: ${(props) => (props.isSingle ? '492px' : '330px')};
	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;
	display: flex;
	gap: 15px;
	margin-right: ${(props) => (props.isSingle ? '0' : '32px')};

	&::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none;
	scrollbar-width: none;
`;

const ImagePreviewWrapper = styled.div`
	position: relative;
	height: 100%;
	width: ${(props) => (props.isSingle ? '100%' : '330px')};
	flex-shrink: 0;
	margin-right: ${(props) => (props.isLast && !props.isSingle ? '32px' : '0')};
`;

const ImagePreview = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 20px;
`;

// 이미지 삭제
const DeleteImageButton = styled.button`
	background: url(${imageCloseIcon}) no-repeat;
	background-size: 100%;
	width: 46px;
	height: 46px;
	position: absolute;
	top: 12px;
	right: 12px;
`;

// 업로드 파일
const UploadFileContainer = styled.div`
	position: absolute;
	bottom: 32px;
	right: 32px;
`;

const UploadFileLabel = styled.label`
	display: block;
	background: url(${uploadIcon}) no-repeat center;
	width: 100px;
	height: 100px;
	background-size: 100%;
	cursor: pointer;
`;

const UploadFileInput = styled.input`
	display: none;
`;

const PostUploadPage = () => {
	const [content, setContent] = useState('');
	const [images, setImages] = useState([]);
	const navigate = useNavigate();

	const handleInput = (e) => {
		setContent(e.target.innerText);
	};

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files);
		const newImages = files.map((file) => ({
			file,
			preview: URL.createObjectURL(file),
		}));
		setImages((prevImages) => [...prevImages, ...newImages]);
	};

	const handleDeleteImage = (index) => {
		setImages((prevImages) => {
			const newImages = [...prevImages];
			URL.revokeObjectURL(newImages[index].preview);
			newImages.splice(index, 1);
			return newImages;
		});
	};

	// 게시글 작성 데이터 가져오기
	const uploadImageData = async () => {
		const token = localStorage.getItem('authToken');
		if (!token) return;

		if (!content && images.length === 0) {
			alert('내용 또는 이미지를 입력해주세요.');
			return;
		}

		try {
			// 이미지 업로드
			const imageUrl = await Promise.all(
				images.map(async (img) => {
					const formData = new FormData();
					formData.append('image', img.file);
					const res = await axios.post(
						'https://estapi.mandarin.weniv.co.kr/image/uploadfile',
						formData
					);
					return `https://estapi.mandarin.weniv.co.kr/${res.data.filename}`;
				})
			);

			// 게시글 작성
			const postData = {
				post: {
					content: content,
					image: imageUrl.join(','),
				},
			};

			const res = await axios.post(
				'https://estapi.mandarin.weniv.co.kr/post',
				postData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			);

			alert('게시글 업로드 성공!');
			navigate('/profile');
		} catch (error) {
			console.error('게시글 업로드 실패:', error);
			alert('게시글 업로드 실패');
		}
	};

	return (
		<PostUploadWrapper>
			<CustomNavigationBar
				title={'게시글 올리기'}
				rightButton={
					<UploadButton onClick={uploadImageData}>업로드</UploadButton>
				}
			/>

			<PostUploadContainer hasImages={images.length > 0}>
				<PostTextDiv
					contentEditable
					onInput={handleInput}
					data-placeholder="게시글을 입력하세요.."
				/>
				{images.length > 0 && (
					<ImagePreviewContainer isSingle={images.length === 1}>
						{images.map((img, index) => (
							<ImagePreviewWrapper
								key={index}
								isSingle={images.length === 1}
								isLast={index === images.length - 1}
							>
								<ImagePreview src={img.preview} alt={`Preview ${index + 1}`} />
								<DeleteImageButton
									onClick={() => handleDeleteImage(index)}
									aria-label="이미지 추가 취소하기"
								/>
							</ImagePreviewWrapper>
						))}
					</ImagePreviewContainer>
				)}
				<UploadFileContainer>
					<UploadFileLabel htmlFor="uploadimg" />
					<UploadFileInput
						type="file"
						id="uploadimg"
						accept="image/*"
						onChange={handleImageUpload}
						multiple
					/>
				</UploadFileContainer>
			</PostUploadContainer>
		</PostUploadWrapper>
	);
};

export default PostUploadPage;
