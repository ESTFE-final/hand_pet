import React from 'react';
import styled from 'styled-components';
import { NavigationBar, Input } from '../components/SharedComponents/CommonComponents';
import basicprofileimg from '../icons/basic-profile-img.svg';
import uploadIcon from '../icons/upload-file.svg';

const EditProfilePage = () => (
	<>

		<InnerWMobileFull>
			<ProfileTitle>프로필 설정</ProfileTitle> {/* 제목 */}
            <ProfileText>나중에 언제든지 변경할수있습니다.</ProfileText>
			<ProfileModifyContent>
				<ProfileImageContent>
					<ProfileImage src={basicprofileimg} alt="프로필 없을때" />
					<ProfileImageLabel htmlFor="profileimg"></ProfileImageLabel>
					<ProfileImageInput
						id="profileimg"
						type="file"
						accept="image/*"
					/>
				</ProfileImageContent>

				<ProfileModifyInputBox>
					<ProfileModifyLabel htmlFor="username">사용자 이름</ProfileModifyLabel>
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

				<BottomButton type="button">
					저장
				</BottomButton>
			</ProfileModifyContent>
		</InnerWMobileFull>
	</>
);

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
	color: black; 
	font-size: 2.4rem; 
	margin: 10px 0;
    color: gray;
`;

const ProfileModifyContent = styled.div`
	padding: 0 3.4rem;
`;

const ProfileModifyLabel = styled.label`
	padding-left: 1.6rem;
	font-size: 1.8rem;
	color: #666;
`;

const ProfileModifyInput = styled(Input)`
	margin-top: 1rem;
	display: block;
	padding: 1.8rem 2rem;
	font-size: 1.6rem;
	border: 1px solid #dbdbdb;
	border-radius: 4px;
	background-color: #fff;
`;

const ProfileModifyInputBox = styled.div`
	width: 644px;  /* 입력 필드 너비 */
	height: 96px;  /* 입력 필드 높이 */
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

// 저장 버튼 스타일
const BottomButton = styled.button`
	width: 644px;  /* 두배값 */
	height: 96px;  
	margin-top: 20px;  /* 간격 */
	display: block;
	padding: 1.8rem 2rem;
	font-size: 1.6rem;
	border: 1px solid #dbdbdb;
	border-radius: 50px;
	background-color: gray;
	cursor: pointer;
	text-align: center;
	color: #333;
	transition: background-color 0.3s;

	&:hover {
		background-color: red;
	}
`;

export default EditProfilePage;
