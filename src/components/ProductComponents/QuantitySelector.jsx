import React from 'react';
import styled from 'styled-components';

const QuantityContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 16px;
`;

const QuantityButton = styled.button`
	width: 40px;
	height: 40px;
	font-size: 24px;
	text-align: center;
	cursor: pointer;
	background-color: #f0f0f0;
	border: none;
	border-radius: 4px;
`;

const QuantityDisplay = styled.span`
	font-size: 24px;
	margin: 0 16px;
`;

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
	return (
		<QuantityContainer>
			<QuantityButton onClick={onDecrease}>-</QuantityButton>
			<QuantityDisplay>{quantity}</QuantityDisplay>
			<QuantityButton onClick={onIncrease}>+</QuantityButton>
		</QuantityContainer>
	);
};

export default QuantitySelector;
