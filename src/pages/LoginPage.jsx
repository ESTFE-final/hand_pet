import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo2 from '../icons/logo2.svg';

// 스타일 컴포넌트 정의
const LoginContainer = styled.div`
  width: 100%;
  max-width: 780px; /* 최대 너비 고정 */
  height: 100vh;  /* 화면 전체 높이 */
  background-color: #ff3329;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const Logo = styled.img`
  width: 308px;
  height: 308px;
  margin-bottom: 30px; /* 로고 아래에 여백 추가 */
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 버튼 사이 여백 */
  width: 100%;
  align-items: center;
  max-width: 300px; /* 최대 너비 제한 */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.6rem;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  color: white;

  &:hover {
    background-color: white;
    color: #ff3329;
  }
`;

const BottomBox = styled.div`
  width: 100%;
  max-width: 780px; /* 최대 너비 제한 */
  height: auto; /* height를 자동으로 맞춤 */
  padding: 40px 20px; /* 여백 추가 */
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
        <StyledLink to="/LoginEmail" style={{ backgroundColor: '#007bff' }}>
          이메일 로그인
        </StyledLink>
        <StyledLink to="/SignUp" style={{ backgroundColor: '#28a745' }}>
          회원가입
        </StyledLink>
      </ButtonWrapper>
    </BottomBox>
  </LoginContainer>
);

export default LoginPage;
