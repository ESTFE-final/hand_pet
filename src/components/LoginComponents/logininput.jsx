import styled from 'styled-components';

// 입력 필드 감싸는 컴포넌트
export const InputWrap = styled.div`
	width: 100%; /* 644px에서 100%로 변경 */
	max-width: 644px; /* 최대 너비 설정 */
	padding: 0px 25px; /* 좌우 패딩 */
	border-radius: 44px;
	display: flex;
	flex-direction: column;
	gap: 35px;
	align-items: center;
	margin: 80px auto;
`;

// 실제 입력 필드 컴포넌트
export const Input = styled.input`
	width: 100%; /* 부모 요소에 맞게 100% */
	height: 100%;
	outline: none;
	border: none;
	font-size: 14px;
	font-weight: 400;
	padding: 0px;
	border-radius: 44px;

	&::placeholder {
		color: #dadada;
	}
`;

// 에러 메시지 컴포넌트
export const ErrorMessageWrap = styled.div`
	color: #ef0000;
	font-size: 12px;
	text-align: center; /* 에러 메시지도 중앙 정렬 */
`;
