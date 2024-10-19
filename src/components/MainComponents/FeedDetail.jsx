import React from 'react';
import styled from 'styled-components';
import userProfileImg from '../../assets/icons/profile-img.svg';
import moreIcon from '../../assets/icons/more-vertical.svg';

const CommentSection = styled.div`
	padding: 28px 32px;
`;

const CommentItem = styled.div`
	display: flex;
	align-items: flex-start;
	margin-bottom: 28px;
	gap: 18px;
`;

const CommentProfileImg = styled.img`
	width: 54px;
	height: 54px;
	border-radius: 50%;
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

const FeedDetail = ({ comments }) => {
	return (
		<CommentSection>
			{comments.map((comment) => (
				<CommentItem key={comment.id}>
					<CommentProfileImg
						src={comment.author.image || userProfileImg}
						alt="사용자 프로필"
					/>
					<CommentContent>
						<CommentUser>
							<UserId className="user-id">{comment.author.username}</UserId>
							<CommetSeparator>·</CommetSeparator>
							<CommentTime>
								{new Date(comment.createdAt).toLocaleString()}
							</CommentTime>
							<CommentButton type="button" aria-label="더보기"></CommentButton>
						</CommentUser>
						<CommentText>{comment.content}</CommentText>
					</CommentContent>
				</CommentItem>
			))}
		</CommentSection>
	);
};

export default FeedDetail;
