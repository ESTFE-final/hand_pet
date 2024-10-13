import React, { useState } from 'react';
import axios from 'axios';
import {
	Page,
	TitleWrap,
	ContentWrap,
	InputWrap,
	Input,
	BottomButton,
} from '../components/LoginComponents/loginindex';
import { Link } from 'react-router-dom';

const LoginPage = () => {
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

			const token = response.data.user.token;
			localStorage.setItem('authToken', token);
		} catch (error) {
			console.error('로그인 실패:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Page>
			<TitleWrap
				style={{
					width: '140px',
					height: '56px',
					position: 'absolute',
					top: '56px',
					left: '50%',
					transform: 'translateX(-50%)',
					textAlign: 'center',
				}}
			>
				로그인
			</TitleWrap>

			<ContentWrap
				style={{
					position: 'absolute',
					top: '38%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<InputWrap
					style={{
						width: '644px',
						height: '96px',
						marginBottom: '20px',
					}}
				>
					<Input
						type="email"
						placeholder="이메일을 입력하세요"
						value={email}
						onChange={handleInputChange(setEmail)}
						style={{ height: '100%' }}
					/>
				</InputWrap>

				<InputWrap
					style={{
						width: '644px',
						height: '96px',
						marginBottom: '20px',
					}}
				>
					<Input
						type="password"
						placeholder="비밀번호를 입력하세요"
						value={password}
						onChange={handleInputChange(setPassword)}
						style={{ height: '100%' }}
					/>
				</InputWrap>

				<BottomButton
					onClick={handleSubmit}
					disabled={isButtonDisabled || isSubmitting}
				>
					{isSubmitting ? '로그인 중...' : '로그인'}
				</BottomButton>

				<Link
					to="/SignUp"
					style={{
						width: '210px',
						height: '28px',
						position: 'absolute',
						top: '320px',
						left: '50%',
						transform: 'translateX(-50%)',
						textAlign: 'center',
						color: 'gray',
						textDecoration: 'none',
						marginTop: '40px',
					}}
				>
					이메일로 회원가입
				</Link>
			</ContentWrap>
		</Page>
	);
};

export default LoginPage;
