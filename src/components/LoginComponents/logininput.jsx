import styled from 'styled-components';
import { Input as BaseInput } from '../SharedComponents/CommonComponents';

// 입력 필드 감싸는 컴포넌트
export const InputWrap = styled.div`
	padding: 0px 3.4rem; /* 좌우 패딩 */
	margin-top: 3.9rem;
`;

// 실제 입력 필드 컴포넌트
export const LoginInput = styled(BaseInput)`
	margin-bottom: 1.8rem;
`;

// 에러 메시지 컴포넌트
export const ErrorMessageWrap = styled.div`
	color: var(--danger);
	font-size: 1.2rem;
	padding-left: 2.1rem;
	margin-bottom: 1.5rem;

	${(props) =>
		props.isServerMessage &&`
		margin-top: 1rem;
		padding-left: 0;
		text-align: center;
	`}
`;
