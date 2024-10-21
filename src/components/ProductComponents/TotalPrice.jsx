import React from 'react';
import styled from 'styled-components';

const TotalPriceContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 4.2rem 0 3.5rem;
	padding: 1.6rem 1.6rem 0;
	border-top: 1px solid var(--graylight-100);
`;
const TotalPricetext = styled.span`
	font-size: 1.8rem;
`;
const TotalPriceAmount = styled.span`
	font-size: 2.6rem;
	font-weight: bold;
	margin-right: .35rem;
`;

const TotalPrice = ({ amount }) => {
  return (
    <TotalPriceContainer>
      <TotalPricetext>총 상품 금액</TotalPricetext>
      <p>
        <TotalPriceAmount>{amount.toLocaleString()}</TotalPriceAmount>
        <TotalPricetext>원</TotalPricetext>
      </p>
	  </TotalPriceContainer>
  )
};

export default TotalPrice;
