import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Input } from '../components/SharedComponents/CommonComponents';
import basicprofileimg from '../assets/icons/profile-img.svg';
import uploadIcon from '../assets/icons/upload-file.svg';

const NewProfilePage = () => {
	const location = useLocation();
	const { email, password } = location.state || {};
	const [username, setUsername] = useState('');
	const [accountname, setAccountname] = useState('');
	const [intro, setIntro] = useState('');
	const [image, setImage] = useState(basicprofileimg);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
			const validateForm = () => {
				const isUsernameValid = username.length >= 2 && username.length <= 10;
				const isAccountnameValid = /^[A-Za-z0-9._]+$/.test(accountname);
				const isIntroValid = intro.trim() !== '';

				setIsFormValid(isUsernameValid && isAccountnameValid && isIntroValid);
			};

			validateForm();
		}, [username, accountname, intro]);

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append('image', file);

			try {
				const response = await axios.post(
					'https://estapi.mandarin.weniv.co.kr/image/uploadfile',
					formData,
					{
						headers: {
							'Content-type': 'multipart/form-data',
						},
					}
				);
				console.log('이미지 업로드 성공:', response.data);
				const uploadedImageUrl = `https://estapi.mandarin.weniv.co.kr/${response.data.filename}`;
				setImage(uploadedImageUrl);
			} catch (error) {
				console.error('이미지 업로드 실패:', error);
			}
		}
	};

	const handleSubmit = async () => {
		if (!isFormValid) return;

		setIsSubmitting(true);

		const userData = {
			user: {
				username,
				email,
				password,
				accountname,
				intro,
				image,
			},
		};

		try {
			const response = await axios.post(
				'https://estapi.mandarin.weniv.co.kr/user',
				userData,
				{
					headers: {
						'Content-type': 'application/json',
					},
				}
			);
			console.log('회원가입 성공:', response.data);
			alert('회원가입이 완료되었습니다.');
			navigate('/login');
		} catch (error) {
			console.error('회원가입 실패:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<InnerWMobileFull>
			<ProfileTitle>프로필 설정</ProfileTitle>
			<ProfileText>나중에 언제든지 변경할 수 있습니다.</ProfileText>
			<ProfileModifyContent>
				<ProfileImageContent>
					<ProfileImage src={image} alt="프로필" />
					<ProfileImageLabel htmlFor="profileimg" />
					<ProfileImageInput
						id="profileimg"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
					/>
				</ProfileImageContent>

				<ProfileModifyInputBox>
					<ProfileModifyLabel htmlFor="username">
						사용자 이름
					</ProfileModifyLabel>
					<ProfileModifyInput
						id="username"
						type="text"
						placeholder="2~10자 이내여야 합니다."
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</ProfileModifyInputBox>

				<ProfileModifyInputBox>
					<ProfileModifyLabel htmlFor="userid">계정 ID</ProfileModifyLabel>
					<ProfileModifyInput
						id="userid"
						type="text"
						placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
						value={accountname}
						onChange={(e) => setAccountname(e.target.value)}
					/>
				</ProfileModifyInputBox>

				<ProfileModifyInputBox>
					<ProfileModifyLabel htmlFor="userpr">소개</ProfileModifyLabel>
					<ProfileModifyInput
						id="userpr"
						type="text"
						placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
						value={intro}
						onChange={(e) => setIntro(e.target.value)}
					/>
				</ProfileModifyInputBox>

				<BottomButton
					type="button"
					onClick={handleSubmit}
					disabled={!isFormValid || isSubmitting}
				>
					{isSubmitting ? '저장 중...' : '저장'}
				</BottomButton>
			</ProfileModifyContent>
		</InnerWMobileFull>
	);
};

const InnerWMobileFull = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
	padding-top: 28px;
`;

const ProfileTitle = styled.h2`
	width: 100%;
	text-align: center;
	color: var(--black);
	font-size: 2.4rem;
	font-weight: normal;
	margin-bottom: 1.2rem;
`;

const ProfileText = styled.p`
	width: 100%;
	text-align: center;
	color: var(--gray-300);
	font-size: 1.4rem;
`;

const ProfileModifyContent = styled.div`
	padding: 3rem 3.4rem 0;
`;

const ProfileModifyLabel = styled.label`
	padding-left: 1.1rem;
	font-size: 1.2rem;
	color: #666;
`;

const ProfileModifyInput = styled(Input)`
	margin-top: 0.75rem;
	display: block;
`;

const ProfileModifyInputBox = styled.div`
	margin-bottom: 1.517rem;
`;

const ProfileImageContent = styled.div`
	position: relative;
	width: 110px;
	height: 110px;
	margin: 0 auto 3rem;
`;

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
`;

const ProfileImageLabel = styled.label`
	position: absolute;
	bottom: 0;
	right: 0;
	display: block;
	background: url(${uploadIcon}) no-repeat center;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	cursor: pointer;
	background-size: 100%;
`;

const ProfileImageInput = styled.input`
	display: none;
`;

const BottomButton = styled.button`
	width: 100%;
	margin-top: 3rem;
	display: block;
	padding: 1.8rem 2rem;
	font-size: 1.4rem;
	border-radius: 4.4rem;
	background-color: ${(props) =>
		props.disabled ? 'var(--gray-100)' : 'var(--primary)'};
	color: white;
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	text-align: center;
	transition:
		background-color 0.3s,
		opacity 0.3s;
`;



export default NewProfilePage;
