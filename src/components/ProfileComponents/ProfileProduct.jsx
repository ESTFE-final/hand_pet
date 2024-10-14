import React from 'react';
import styled from 'styled-components';
import MainProductList from '../MainComponents/MainProductList';

const ProductContainer = styled.section``;

const ProfileProduct = () => {
	return (
		<ProductContainer aria-label="상품 목록">
			<MainProductList />
		</ProductContainer>
	);
};

export default ProfileProduct;
