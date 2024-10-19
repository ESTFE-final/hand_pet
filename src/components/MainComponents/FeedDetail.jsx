import React from 'react';
import styled from 'styled-components';
import userProfileImg from '../../assets/icons/profile-img.svg';
import moreIcon from '../../assets/icons/more-vertical.svg';

const CommentSection = styled.div`
	flex: 1;
	overflow-y: auto;
`;

const CommentItem = styled.div`
	display: flex;
	align-items: flex-start;
	padding: 12px 32px;
`;

const CommentProfileImg = styled.img`
	width: 54px;
	height: 54px;
	border-radius: 50%;
	margin-right: 12px;
`;

const CommentContent = styled.div`
	flex: 1;
`;

const CommentUser = styled.div`
	display: flex;
	align-items: center;
	margin: 6px 0 18px 0;
`;

const UserId = styled.span`
	font-size: 2.2rem;
`;

const CommetSeparator = styled.span`
	margin: 0 8px;
`;

const CommentTime = styled.div`
	font-size: 1.4rem;
	color: #a5a5a5;
`;

const CommentButton = styled.button`
	background: url(${moreIcon}) no-repeat;
	background-size: 100%;
	width: 25px;
	height: 25px;
	margin-left: auto;
`;

const CommentText = styled.p`
	font-size: 2rem;
	margin: 0;
`;

const FeedDetail = () => {
	return (
		<CommentSection>
			<CommentItem>
				<CommentProfileImg src={userProfileImg} alt="" />
				<CommentContent>
					<CommentUser>
						<UserId className="user-id">애견 놀이 가게샵 🐶</UserId>
						<CommetSeparator>·</CommetSeparator>
						<CommentTime>5분 전</CommentTime>
						<CommentButton type="button" aria-label="더보기"></CommentButton>
					</CommentUser>
					<CommentText>게시글 달글 ~~!! 최고최고</CommentText>
				</CommentContent>
			</CommentItem>
		</CommentSection>
	);
};

export default FeedDetail;
