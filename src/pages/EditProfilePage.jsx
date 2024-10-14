import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import basicprofileimg from '../assets/icons/profile-img.svg';
import uploadIcon from '../assets/icons/upload-file.svg';

const EditProfilePage = () => {
	const location = useLocation();
	const { email, password } = location.state || {};

	const [username, setUsername] = useState('');
	const [accountname, setAccountname] = useState('');
	const [intro, setIntro] = useState('');
	const [image, setImage] = useState(basicprofileimg);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async () => {
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
			// 성공 시 다음 페이지로 이동하거나 알림 표시 가능
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
					<ProfileImageLabel htmlFor="profileimg"></ProfileImageLabel>
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
					disabled={isSubmitting}
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
	padding-bottom: 10rem;
`;

const ProfileTitle = styled.h2`
	width: 100%;
	text-align: center;
	color: black;
	font-size: 4.8rem;
`;

const ProfileText = styled.h3`
	width: 100%;
	text-align: center;
	color: gray;
	font-size: 2.4rem;
	margin: 10px 0;
`;

const ProfileModifyContent = styled.div`
	padding: 0 3.4rem;
`;

const ProfileModifyLabel = styled.label`
	padding-left: 1.6rem;
	font-size: 1.8rem;
	color: #666;
`;

const ProfileModifyInput = styled.input`
	width: 644px;
	height: 96px;
	margin-top: 1rem;
	display: block;
	padding: 1.8rem 2rem;
	font-size: 1.6rem;
	border: 1px solid #dbdbdb;
	border-radius: 4px;
	background-color: #fff;
`;

const ProfileModifyInputBox = styled.div`
	margin-bottom: 20px;
`;

const ProfileImageContent = styled.div`
	position: relative;
	width: 180px;
	height: 180px;
	margin: 0 auto 6rem;
`;

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
`;

const ProfileImageLabel = styled.label`
	position: absolute;
	bottom: 0;
	right: 0;
	display: block;
	background: url(${uploadIcon}) no-repeat center;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	cursor: pointer;
	background-size: 100%;
`;

const ProfileImageInput = styled.input`
	display: none;
`;

const BottomButton = styled.button`
	width: 644px;
	height: 96px;
	margin-top: 20px;
	display: block;
	padding: 1.8rem 2rem;
	font-size: 1.6rem;
	border: 1px solid #dbdbdb;
	border-radius: 50px;
	background-color: ${(props) => (props.disabled ? 'gray' : 'blue')};
	color: white;
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	text-align: center;
	transition: background-color 0.3s;

	&:hover {
		background-color: ${(props) => (props.disabled ? 'gray' : 'red')};
	}
`;

export default EditProfilePage;
