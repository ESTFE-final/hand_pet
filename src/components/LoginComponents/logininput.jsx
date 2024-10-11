import styled from 'styled-components';

// 입력 필드 제목 컴포넌트
export const InputTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #262626;
  text-align: center;  /* 제목 중앙 정렬 */
  margin-bottom: 8px;  /* 제목과 입력 필드 사이의 간격 */
`;

// 입력 필드 감싸는 컴포넌트
export const InputWrap = styled.div`
  width: 100%;  /* 644px에서 100%로 변경 */
  max-width: 644px;  /* 최대 너비 설정 */
  height: 48px;  /* 높이를 적절하게 조정 */
  position: relative;  /* 절대 위치를 위해 relative 사용 */
  padding: 0px 25px;  /* 좌우 패딩 */
  border-radius: 44px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  background-color: white;
  margin: 0 auto;  /* 중앙 정렬을 위해 마진 자동 설정 */

  &:focus-within {
    border: 1px solid gray;
  }
`;

// 실제 입력 필드 컴포넌트
export const Input = styled.input`
  width: 100%;  /* 부모 요소에 맞게 100% */
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
  margin-top: 8px;
  color: #ef0000;
  font-size: 12px;
  text-align: center;  /* 에러 메시지도 중앙 정렬 */
`;
