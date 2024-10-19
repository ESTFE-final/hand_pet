import React, { useState } from 'react';
import styled from 'styled-components';
import userProfileImg from '../../assets/icons/profile-img.svg';
import moreIcon from '../../assets/icons/more-vertical.svg';
import { PostModal } from '../SharedComponents/CommonComponents';
import { current } from '@reduxjs/toolkit';

const CommentSection = styled.div`
	padding: 28px 32px;
	margin-bottom: 56px;
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
	margin-right: 46px;
`;

const FeedDetail = ({ comments, onDeleteComment }) => {
	const [isPostModalOpen, setIsPostModalOpen] = useState(false);
	const [currentCommentId, setCurrentCommentId] = useState(null);

	const openPostModal = (commentId) => {
		setIsPostModalOpen(true);
		setCurrentCommentId(commentId);
	};

	const closePostModal = () => {
		setIsPostModalOpen(false);
		setCurrentCommentId(null);
	};

	const handleDeleteComment = (commentId) => {
		if (currentCommentId) {
			onDeleteComment(currentCommentId);
			closePostModal();
		}
	};

	const postModalOptions = [{ text: '삭제', onClick: handleDeleteComment }];

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
							<CommentButton
								type="button"
								aria-label="더보기"
								onClick={() => openPostModal(comment.id)}
							></CommentButton>
						</CommentUser>
						<CommentText>{comment.content}</CommentText>
					</CommentContent>
				</CommentItem>
			))}
			<PostModal
				isOpen={isPostModalOpen}
				onClose={closePostModal}
				options={postModalOptions}
			/>
		</CommentSection>
	);
};

export default FeedDetail;
