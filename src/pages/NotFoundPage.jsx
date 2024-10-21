import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import notFoundIcon from '../assets/icons/icon-404.svg';
import Button from '../components/SharedComponents/Button';

const NotFoundWrapper = styled.section`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;

const NotFoundIcon = styled.img`
	width: 132px;
	height: 151px;
`;

const NotFoundText = styled.span`
	font-size: 1.4rem;
	color: var(--gray-300);
`;

const NotFoundPage = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<NotFoundWrapper>
			<NotFoundIcon src={notFoundIcon} alt="" />
			<NotFoundText>페이지를 찾을 수 없습니다. :&#40;</NotFoundText>
			<Button size="sm" onClick={handleBack}>
				이전 페이지
			</Button>
		</NotFoundWrapper>
	);
};

export default NotFoundPage;
