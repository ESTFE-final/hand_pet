import React from 'react';
import styled from 'styled-components';

import InputPic from './InputPic';
import FloatinButton from './FloatinButton';
import InputName from './InputName';
import GoodsName from './GoodsName';
import InputSell from './InputSell';

const InputDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	padding: 0 20px;
	margin-top: -100px;
`;

const InputTotal = () => {
	return (
		<InputDiv>
			<InputPic />
			<FloatinButton />
			<GoodsName />
			<InputName />
			<InputSell />
		</InputDiv>
	);
};

export default InputTotal;
