import React from 'react';
import styled from 'styled-components';

const TotalPriceContainer = styled.div`
	font-size: 24px;
	font-weight: bold;
	margin-top: 16px;
	text-align: right;
`;

const TotalPrice = ({ amount }) => {
	return (
		<TotalPriceContainer>
			{`총 상품 금액: ${amount.toLocaleString()}원`}
		</TotalPriceContainer>
	);
};

export default TotalPrice;
