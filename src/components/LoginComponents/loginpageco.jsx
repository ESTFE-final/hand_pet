import styled from 'styled-components';

// 페이지 전체 레이아웃 컴포넌트
export const Page = styled.div`
	position: relative;
	top: 0;
	width: 100%;
	/* max-width: px; */
	padding: 0 20px;
	left: 50%;
	transform: translateX(-50%);
	min-height: 100vh;  /* 세로로 화면을 꽉 채움 */
	box-sizing: border-box;
	background-color: skyblue;
	display: flex;
	flex-direction: column;
	justify-content: center;  /* 세로 중앙 정렬 추가 */
	overflow: hidden;
`;
