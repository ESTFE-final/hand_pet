import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const AddProductPage = () => (
	<div>
		<h1>판매 상품 등록 페이지입니다</h1>
		<Link to="/myprofile">저장 버튼 누르면 내 프로필 페이지로 이동</Link>
	</div>
);

export default AddProductPage;
