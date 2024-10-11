import styled from 'styled-components';

// 하단 버튼 컴포넌트
export const BottomButton = styled.button`
	width: 100%;  /* 644px에서 100%로 변경 */
	max-width: 644px;  /* 최대 너비 설정 */
	height: 96px;
	border: none;
	font-weight: 700;
	background-color: #9e30f4;
	border-radius: 44px;
	color: white;
	cursor: pointer;
	margin: 10px auto;  /* 수직 여백 추가 및 중앙 정렬 */

	&:disabled {
		background-color: #dadada;
		color: white;
	}
`;
