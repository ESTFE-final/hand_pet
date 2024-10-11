import React, { useState } from 'react';
import { Page, TitleWrap, ContentWrap, InputWrap, Input, BottomButton } from '../components/LoginComponents/loginindex';
import { Link } from 'react-router-dom'; // Link import for navigation

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const toggleButtonState = (emailValue, passwordValue) => {
    setButtonDisabled(!(emailValue && passwordValue));
  };

  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
    setter(value);
    toggleButtonState(email, password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 요청 중...');
  };

  return (
    <Page>
      <TitleWrap style={{ 
        width: '140px', 
        height: '56px', 
        position: 'absolute', 
        top: '56px', 
        left: '50%', 
        transform: 'translateX(-50%)', // 중앙 정렬
        textAlign: 'center' // 텍스트 중앙 정렬
      }}>
        로그인
      </TitleWrap>
      
      <ContentWrap style={{
        position: 'absolute', 
        top: '38%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', // 중앙 정렬
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' // 아이템 중앙 정렬
      }}>
        <InputWrap style={{ 
          width: '644px',  // 너비를 644px로 설정
          height: '96px',  // 높이를 96px로 설정
          marginBottom: '20px' // 입력 필드 간 간격
        }}>
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleInputChange(setEmail)}
            style={{ height: '100%' }} // 입력 필드 높이 100%로 설정
          />
        </InputWrap>

        <InputWrap style={{ 
          width: '644px',  // 너비를 644px로 설정
          height: '96px',  // 높이를 96px로 설정
          marginBottom: '20px' // 입력 필드 간 간격
        }}>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handleInputChange(setPassword)}
            style={{ height: '100%' }} // 입력 필드 높이 100%로 설정
          />
        </InputWrap>

        <BottomButton onClick={handleSubmit} disabled={isButtonDisabled}>
          로그인
        </BottomButton>

        {/* 이메일로 회원가입 링크 */}
        <Link to="/SignUp" style={{
          width: '210px',
          height: '28px',
          position: 'absolute',
          top: '320px',
          left: '50%',
          transform: 'translateX(-50%)', // 중앙 정렬
          textAlign: 'center',
          color: 'gray', // 링크 색상
          textDecoration: 'none', // 링크 밑줄 제거
          marginTop: '40px' // 버튼과의 간격
        }}>
          이메일로 회원가입
        </Link>
      </ContentWrap>
    </Page>
  );
};

export default LoginPage;
