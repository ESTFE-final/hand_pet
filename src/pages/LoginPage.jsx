import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo2 from '../assets/icons/logo2.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// 스타일 컴포넌트 정의
const LoginContainer = styled.div`
	width: 100%;
	height: 100vh; /* 화면 전체 높이 */
	background-color: var(--primary);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	color: var(--white);
`;

const LogoContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Logo = styled.img`
	width: 200px;
	height: 200px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px; /* 버튼 사이 여백 */
	width: 100%;
	align-items: center;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	/* font-size: 1.8rem; */
	padding: 14px 0;
	border-radius: 50px;
	width: 100%;
	text-align: center;
	color: var(--gray-300);
	border: 1px solid var(--primary);
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.2s ease;

	&:hover {
		background-color: var(--primary);
		color: var(--white);
	}
`;

const BottomBox = styled.div`
	width: 100%;
	height: auto; /* height를 자동으로 맞춤 */
	padding: 50px 34px; /* 여백 추가 */
	border-radius: 20px 20px 0 0;
	background-color: var(--white);
`;


const LoginPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			navigate('/home', { replace: true });
		}
	}, []);

	return (
		<LoginContainer>
      <LogoContainer>
			<Logo src={logo2} alt="Logo2" />
      </LogoContainer>
			<BottomBox>
				<ButtonWrapper>
					<StyledLink to="/login/email">이메일 로그인</StyledLink>
					<StyledLink to="/signup">회원가입</StyledLink>
				</ButtonWrapper>
			</BottomBox>
		</LoginContainer>
	);
};

export default LoginPage;
