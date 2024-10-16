import React, { useState } from 'react';
import axios from 'axios';
import {
	TitleWrap,
	InputWrap,
	BottomButton,
} from '../components/LoginComponents/loginindex';
import { Link } from 'react-router-dom';
import { Input } from '../components/SharedComponents/CommonComponents';

const LoginEmailPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isButtonDisabled, setButtonDisabled] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const toggleButtonState = (emailValue, passwordValue) => {
		setButtonDisabled(!(emailValue && passwordValue));
	};

	const handleInputChange = (setter) => (e) => {
		const { value } = e.target;
		setter(value);
		toggleButtonState(email, password);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		console.log('로그인 요청 중...');

		const loginData = {
			user: {
				email,
				password,
			},
		};

		try {
			const response = await axios.post(
				'https://estapi.mandarin.weniv.co.kr/user/login',
				loginData,
				{
					headers: {
						'Content-type': 'application/json',
					},
				}
			);
			console.log('로그인 성공:', response.data);

            const { token, accountname } = response.data.user;
            localStorage.setItem('authToken', token);
            localStorage.setItem('accountname', accountname);
			dispatch(login(token));
		} catch (error) {
			console.error('로그인 실패:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<TitleWrap>로그인</TitleWrap>
			<InputWrap>
				<Input
					type="email"
					placeholder="이메일을 입력하세요"
					value={email}
					onChange={handleInputChange(setEmail)}
				/>
				<Input
					type="password"
					placeholder="비밀번호를 입력하세요"
					value={password}
					onChange={handleInputChange(setPassword)}
				/>
				<BottomButton
					onClick={handleSubmit}
					disabled={isButtonDisabled || isSubmitting}
				>
					{isSubmitting ? '로그인 중...' : '로그인'}
				</BottomButton>
				<Link to="/signup">이메일로 회원가입</Link>
			</InputWrap>
		</>
	);
};

export default LoginEmailPage;
