import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import {
	NavigationBar,
	Input,
} from '../components/SharedComponents/CommonComponents';
import basicprofileimg from '../assets/icons/profile-img.svg';
import uploadIcon from '../assets/icons/upload-file.svg';

const EditProfilePage = () => {
	const [username, setUsername] = useState('');
	const [accountname, setAccountname] = useState('');
	const [intro, setIntro] = useState('');
	const [profileImage, setProfileImage] = useState(basicprofileimg);
	const [file, setFile] = useState(null);
	const navigate = useNavigate();

	const token = localStorage.getItem('authToken');

	const handleImageUpload = async () => {
		if (!file) return profileImage;

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
			const imageUrl = `https://estapi.mandarin.weniv.co.kr/${response.data.filename}`;
			return imageUrl;
		} catch (error) {
			console.error('Error uploading image:', error);
			return profileImage;
		}
	};

	const handleSaveProfile = async () => {
		const imageUrl = await handleImageUpload();

		const data = {
			user: {
				username,
				accountname,
				intro,
				image: imageUrl,
			},
		};

		try {
			const response = await axios.put(
				'https://estapi.mandarin.weniv.co.kr/user',
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			);
			alert('프로필이 성공적으로 수정되었습니다.');

			localStorage.setItem('accountname', response.data.user.accountname);

			navigate('/profile');
		} catch (error) {
			console.error('Error saving profile:', error);
			alert('프로필 수정에 실패했습니다.');
		}
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = () => {
				setProfileImage(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		}
	};

	return (
		<>
			<NavigationBar
				rightButton={
					<Button size="md" type="button" onClick={handleSaveProfile}>
						저장
					</Button>
				}
			/>
			<h1 className="sr-only"> 프로필 편집</h1>
			<InnerWMobileFull>
				<ProfileModifyContent>
					<ProfileImageContent>
						<img src={profileImage} alt="프로필 이미지" />
						<ProfileImageLabel htmlFor="profileimg"></ProfileImageLabel>
						<ProfileImageInput
							id="profileimg"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
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
				</ProfileModifyContent>
			</InnerWMobileFull>
		</>
	);
};

const InnerWMobileFull = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
	padding-top: 28px;
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
`;

const ProfileImageInput = styled.input`
	display: none;
`;

export default EditProfilePage;
