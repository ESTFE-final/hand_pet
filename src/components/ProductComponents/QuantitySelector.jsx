import React from 'react';
import styled from 'styled-components';

const QuantityContainer = styled.div`
	margin: 2.6rem 1.6rem 0;
	background-color: #f5f5f4;
	border-radius: 0.8rem;
	padding: 2.4rem 1.6rem;
`;
const QuantityCounter = styled.div`
	display: inline-flex;
	align-items: center;
	background-color: var(--white);
	border: 1px solid #c4c4c4;
	border-radius: 0.5rem;
`;

const QuantityButton = styled.button`
	width: 40px;
	font-size: 3rem;
	text-align: center;
	&:first-child {
		border-right: 1px solid #c4c4c4;
	}
	&:last-child {
		border-left: 1px solid #c4c4c4;
	}
`; 

const QuantityDisplay = styled.span`
	font-size: 1.8rem;
	margin: 0 16px;

`;

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
	return (
		<QuantityContainer>
			<QuantityCounter>
				<QuantityButton onClick={onDecrease}>-</QuantityButton>
				<QuantityDisplay>{quantity}</QuantityDisplay>
				<QuantityButton onClick={onIncrease}>+</QuantityButton>
			</QuantityCounter>
		</QuantityContainer>
	);
};

export default QuantitySelector;
