import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar, Input } from '../components/SharedComponents/CommonComponents';
import basicprofileimg from '../icons/basic-profile-img.svg';
import uploadIcon from '../icons/upload-file.svg';


const EditProfilePage = () => (
	<>
		<NavigationBar
			rightButton={
				<Button size="md" type="button">
					저장
				</Button>
			}
		/>
		<h1 className="sr-only"> 프로필 편집 화면입니다</h1>
		<InnerWMobileFull>
			<ProfileModifyContent>
				<ProfileImageContent>
					<ProfileImage src={basicprofileimg} alt="프로필 없을때" />
					<ProfileImageLabel htmlFor="profileimg"></ProfileImageLabel>
					<ProfileImageInput
						id="profileimg"
						ype="file"
						accept="image/*"
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
					/>
				</ProfileModifyInputBox>
				<ProfileModifyInputBox>
					<ProfileModifyLabel htmlFor="userid">계정 ID</ProfileModifyLabel>
					<ProfileModifyInput
						id="userid"
						type="text"
						placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
					/>
				</ProfileModifyInputBox>
				<ProfileModifyInputBox>
					<ProfileModifyLabel htmlFor="userpr">소개</ProfileModifyLabel>
					<ProfileModifyInput
						id="userpr"
						type="text"
						placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
					/>
				</ProfileModifyInputBox>
			</ProfileModifyContent>
		</InnerWMobileFull>
	</>
);


const InnerWMobileFull = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
	padding-bottom: 10rem;
`

const ProfileModifyContent = styled.div`
	padding: 0 3.4rem;
`

const ProfileModifyLabel = styled.label`
	padding-left: 1.6rem;
	font-size: 1.8rem;
	color: #666;
`

const ProfileModifyInput = styled(Input)`
	margin-top: 1rem;
	display: block;
	padding: 1.8rem 2rem;
	font-size: 1.6rem;
`;
	

const ProfileModifyInputBox = styled.div`
	margin-bottom: 2.8rem;
`

const ProfileImageContent = styled.div`
	position: relative;
	width: 180px;
	height: 180px;
	margin: 0 auto 6rem;
`

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
`

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
`


export default EditProfilePage;
