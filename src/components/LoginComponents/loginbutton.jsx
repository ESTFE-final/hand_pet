import styled from 'styled-components';

// 하단 버튼 컴포넌트
export const BottomButton = styled.button`
	width: 100%; /* 644px에서 100%로 변경 */
	max-width: 644px; /* 최대 너비 설정 */
	padding: 2.126rem 2rem;
	border: none;
	font-weight: 700;
	background-color: #9e30f4;
	border-radius: 44px;
	color: white;
	cursor: pointer;
	margin: 50px 0 0 0;

	&:disabled {
		background-color: #dadada;
		color: white;
	}
`;
