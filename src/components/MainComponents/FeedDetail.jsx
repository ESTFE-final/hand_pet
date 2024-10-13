import React from 'react';
import styled from 'styled-components';

const CommentSection = styled.div`
	margin-top: 12px;
`;

const Comment = styled.div`
	font-size: 1.6rem;
	color: #555555;
	margin-bottom: 8px;
	display: flex;
	justify-content: space-between;
`;

const CommentTime = styled.div`
	font-size: 1.4rem;
	color: #a5a5a5;
`;

const FeedDetail = () => {
	return (
		<CommentSection>
			<Comment>
				<span>애견 놀이 가게샵 🐶</span>
				<CommentTime>5분 전</CommentTime>
			</Comment>
			<Comment>
				<span>게시글 달글 ~~!! 최고최고</span>
				<CommentTime>5분 전</CommentTime>
			</Comment>
			<Comment>
				<span>
					너무 귀엽네요! 노을이 생일에도 주문해야겠네요. 게시글 잘 보고 갑니다!
				</span>
				<CommentTime>15분 전</CommentTime>
			</Comment>
		</CommentSection>
	);
};

export default FeedDetail;
