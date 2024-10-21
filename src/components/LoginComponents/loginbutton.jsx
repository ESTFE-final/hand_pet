import styled from 'styled-components';

// 하단 버튼 컴포넌트
export const BottomButton = styled.button`
	width: 100%;
	padding: 1.7rem 0;
	font-size: 1.4rem;
	background-color: var(--primary);
	border-radius: 4.4rem;
	color: var(--white);
	margin-top: 2.9rem;

	&:disabled {
		background-color: var(--gray-100);
		color: var(--white);
	}
`;
