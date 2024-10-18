import React from 'react';
import styled from 'styled-components';

/**
 * A styled input field component with custom styles.
 *
 * Styles:
 * - Border: 1px
 */
const InputField = styled.input`
	/* Border styles */
	border: none;
	border-radius: 30px;

	/* Size */
	width: 644px;
	height: 72px;

	/* Font */
	font-size: 1.5rem;

	/* Background */
	background-color: #22222222;

	/* Spacing */
	padding: 8px 16px;
	margin-bottom: 50px;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Label = styled.label`
	font-size: 3rem;
	margin-bottom: 8px;
`;

const InputName = () => {
	return (
		<InputContainer>
			<Label>상품명</Label>
			<InputField
				type="text"
				placeholder="검색어를 입력하세요"
				style={{ fontSize: '3rem' }}
			/>
		</InputContainer>
	);
};

export default InputName;
