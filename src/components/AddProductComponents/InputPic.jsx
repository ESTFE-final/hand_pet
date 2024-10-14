import React from 'react';
import styled from 'styled-components';

const InputField = styled.input`
	display: flex;
	position: relative;

	width: 644px;
	height: 408px;
	top: 64px;
	gap: 0px;
	border-radius: 30px;
	border: 1px 0px 0px 0px;
	opacity: 0px;

	border: 1px solid #e5e5e5;
	padding: 8px 16px;
	border: none;

	font-size: 1.5rem;
	background-color: #22222222;
	margin-bottom: -70px;
	padding: 200px;
	justify-content: center;
	align-items: center;
	align-content: center;
	justify-items: center;
`;

const Label = styled.label`
	justify-content: bottom;
	display: flex;
	font-size: 3rem;
	margin-bottom: 0px;
	transform: translate(0px, 45px);
`;

const InputPic = () => {
	return (
		<div>
			<Label>이미지 등록</Label>
			<InputField type="text" placeholder="" style={{ fontSize: '3rem' }} />
		</div>
	);
};

export default InputPic;
