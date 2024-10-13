import React, { useState } from 'react';
// component 폴더에 있는 스타일 컴포넌트를 불러오기
import { Page, TitleWrap, ContentWrap, InputWrap, Input, ErrorMessageWrap, BottomButton } from '../components/LoginComponents/loginindex';
import { Link } from 'react-router-dom'; // Link import for navigation

const SignupPage = () => {
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 
	const [emailError, setEmailError] = useState(''); 
	const [passwordError, setPasswordError] = useState(''); 
	const [isButtonDisabled, setButtonDisabled] = useState(true); 

	const handleEmailChange = (e) => {
		setEmail(e.target.value); 
		validateForm(e.target.value, password); 
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value); 
		validateForm(email, e.target.value); 
	};

	const validateForm = (email, password) => {
		let isValid = true;

		if (!email.includes('@')) {
			setEmailError('올바른 이메일 주소를 입력해주세요'); 
			isValid = false; 
		} else {
			setEmailError(''); 
		}

		if (password.length < 8) {
			setPasswordError('영문, 숫자, 특수문자 포함 8자 이상 입력해주세요'); 
			isValid = false; 
		} else {
			setPasswordError(''); 
		}

		setButtonDisabled(!isValid); 
	};

	const handleSubmit = (e) => {
		e.preventDefault(); 
		console.log('회원가입 요청 중...'); 
	};

	return (
		<Page>
			<TitleWrap style={{ 
				width: '140px', 
				height: '56px', 
				position: 'absolute', 
				top: '56px', 
				left: '50%', 
				transform: 'translateX(-50%)', 
				textAlign: 'center' 
			}}>
				회원가입
			</TitleWrap>

			<ContentWrap style={{
				position: 'absolute', 
				top: '38%', 
				left: '50%', 
				transform: 'translate(-50%, -50%)', 
				display: 'flex', 
				flexDirection: 'column', 
				alignItems: 'center' 
			}}>
				<InputWrap style={{ 
					width: '644px',  
					height: '96px',  
					marginBottom: '20px' 
				}}>
					<Input
						type="email"
						placeholder="이메일을 입력하세요" 
						value={email} 
						onChange={handleEmailChange} 
						style={{ height: '100%' }} 
					/>
				</InputWrap>
				<ErrorMessageWrap>{emailError}</ErrorMessageWrap>

				<InputWrap style={{ 
					width: '644px',  
					height: '96px',  
					marginBottom: '20px' 
				}}>
					<Input
						type="password"
						placeholder="비밀번호를 입력하세요" 
						value={password} 
						onChange={handlePasswordChange} 
						style={{ height: '100%' }} 
					/>
				</InputWrap>
				<ErrorMessageWrap>{passwordError}</ErrorMessageWrap>

				<BottomButton onClick={handleSubmit} disabled={isButtonDisabled}>
					다음
				</BottomButton>
				{/* 기능 구현까지 잠깐 프로필 등록 포탈 */}
				<Link to="/newprofile" style={{
          width: '210px',
          height: '28px',
          position: 'absolute',
          top: '500px',
          left: '50%',
          transform: 'translateX(-50%)', // 중앙 정렬
          textAlign: 'center',
          color: 'gray', // 링크 색상
          textDecoration: 'none', // 링크 밑줄 제거
          marginTop: '40px' // 버튼과의 간격
        }}>
          프로필 등록 포탈
        </Link>




			</ContentWrap>
		</Page>
	);
};

export default SignupPage; 
