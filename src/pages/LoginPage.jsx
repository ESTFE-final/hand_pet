import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo2 from '../assets/icons/logo2.svg';

// 스타일 컴포넌트 정의
const LoginContainer = styled.div`
	width: 100%;
	height: 100vh; /* 화면 전체 높이 */
	background-color: #ff3329;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: white;
	position: relative;
`;

const Logo = styled.img`
	width: 308px;
	height: 308px;
	margin-bottom: 80px; /* 로고 아래에 여백 추가 */
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px; /* 버튼 사이 여백 */
	width: 100%;
	align-items: center;
	max-width: 500px; /* 최대 너비 제한 */
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1.8rem;
	padding: 10px 20px;
	border-radius: 50px;
	width: 100%;
	height: 70px;
	text-align: center;
	color: var(--gray-300);
	border: 1px solid var(--primary);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const BottomBox = styled.div`
	width: 100%;
	max-width: 780px; /* 최대 너비 제한 */
	height: auto; /* height를 자동으로 맞춤 */
	padding: 100px 20px; /* 여백 추가 */
	border-radius: 20px 20px 0 0;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 0;
`;

const LoginPage = () => (
	<LoginContainer>
		<Logo src={logo2} alt="Logo2" />
		<BottomBox>
			<ButtonWrapper>
				<StyledLink to="/LoginEmail">이메일 로그인</StyledLink>
				<StyledLink to="/SignUp">회원가입</StyledLink>
			</ButtonWrapper>
		</BottomBox>
	</LoginContainer>
);

export default LoginPage;
