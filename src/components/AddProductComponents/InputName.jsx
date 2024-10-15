import React from 'react';
import styled from 'styled-components';

// InputField Styles
const InputField = styled.input`
	/* Border Styles */
	border: none;
	border-radius: 30px;
	border: 1px solid #e5e5e5;

	/* Size & Spacing */

	/* Size & Spacing */
	width: 644px;
	height: 72px;
	padding: 8px 16px;
	margin-bottom: 50px;

	/* Background & Font */
	background-color: #22222222;
	font-size: 1.5rem;
	padding: 8px 16px;
	margin-bottom: 50px;

	/* Background & Font */
	background-color: #22222222;
	font-size: 1.5rem;
`;

// InputContainer Styles
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

// Label Styles
const Label = styled.label`
	/* Font Styles */
	font-size: 3rem;
	margin-bottom: 8px;
`;

const InputName = () => {
	return (
		<InputContainer>
			<Label>가격</Label>
			<InputField
				type="text"
				placeholder="검색어를 입력하세요2"
				style={{ fontSize: '3rem' }}
			/>
		</InputContainer>
	);
};

export default InputName;
