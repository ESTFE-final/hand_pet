import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	TitleWrap,
	InputWrap,
	ErrorMessageWrap,
	BottomButton,
	LoginInput,
} from '../components/LoginComponents/loginindex';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [serverMessage, setServerMessage] = useState('');
	const [isButtonDisabled, setButtonDisabled] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			navigate('/home', { replace: true });
		}
	}, [navigate]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setServerMessage('');

		if (!isButtonDisabled) {
			try {
				const response = await axios.post(
					'https://estapi.mandarin.weniv.co.kr/user/emailvalid',
					{
						user: { email: email },
					},
					{
						headers: {
							'Content-type': 'application/json',
						},
					}
				);

				setServerMessage(response.data.message);
				console.log(response);

				if (response.data.message === '사용 가능한 이메일 입니다.') {
					navigate('/profile/new', {
						state: { email, password },
						replace: true,
						// replace 구문을 navigate 함수에 추가하면 뒤로가기 버튼을 눌렀을때 히스토리 스택에서 제거되어 이 페이지로 돌아오지 못하게합니다.
					});
				}
			} catch (error) {
				setServerMessage('이메일 확인 중 오류가 발생했습니다.');
			}
		}
	};

	return (
		<>
			<TitleWrap>회원가입</TitleWrap>
			<InputWrap>
				<LoginInput
					type="email"
					placeholder="이메일을 입력하세요"
					value={email}
					onChange={handleEmailChange}
				/>
				<ErrorMessageWrap>{emailError}</ErrorMessageWrap>
				<LoginInput
					type="password"
					placeholder="비밀번호를 입력하세요"
					value={password}
					onChange={handlePasswordChange}
				/>
				<ErrorMessageWrap>{passwordError}</ErrorMessageWrap>
				<BottomButton onClick={handleSubmit} disabled={isButtonDisabled}>
					다음
				</BottomButton>
				<ErrorMessageWrap isServerMessage>{serverMessage}</ErrorMessageWrap>
			</InputWrap>
		</>
	);
};

export default SignupPage;
