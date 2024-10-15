import React from 'react';
import styled from 'styled-components';

// Input Styles
const InputField = styled.input`
	border: 1px solid #e5e5e5;
	padding: 8px 16px;
	border-radius: 30px;
	border: none;
	font-size: 1.5rem;
	background-color: #22222222;
	margin-bottom: 500px;
	width: 644px;
	height: 72px;
`;

// Container Styles
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

// Label Styles
const Label = styled.label`
	font-size: 3rem;
	margin-bottom: 8px;
`;

const InputSell = () => {
	return (
		<InputContainer>
			<Label>판매 링크</Label>
			<InputField
				type="text"
				placeholder="검색어를 입력하세요3"
				style={{ fontSize: '3rem' }}
			/>
		</InputContainer>
	);
};

export default InputSell;
