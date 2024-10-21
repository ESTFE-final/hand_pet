import React, { useState } from 'react';
import styled from 'styled-components';
import userProfileImg from '../../assets/icons/profile-img.svg';
import moreIcon from '../../assets/icons/more-vertical.svg';
import { PostModal } from '../SharedComponents/CommonComponents';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const CommentSection = styled.div`
	padding: 20px 16px;
	margin-bottom: 30px;
`;

const CommentItem = styled.div`
	display: flex;
	align-items: flex-start;
	margin-bottom: 18px;
	gap: 12px;
`;

const CommentProfileImg = styled.img`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	cursor: pointer;
`;

const CommentContent = styled.div`
	flex: 1;
`;

const CommentUser = styled.div`
	display: flex;
	align-items: center;
	margin: 4px 0 10px 0;
`;

const UserId = styled.span`
	font-size: 1.6rem;
`;

const CommetSeparator = styled.span`
	margin: 0 6px;
`;

const CommentTime = styled.div`
	font-size: 1rem;
	color: #a5a5a5;
`;

const CommentButton = styled.button`
	background: url(${moreIcon}) no-repeat;
	background-size: 100%;
	width: 20px;
	height: 20px;
	margin-left: auto;
`;

const CommentText = styled.p`
	font-size: 1.6rem;
	margin-right: 38px;
`;

const FeedDetail = ({ comments, onDeleteComment }) => {
	const [isPostModalOpen, setIsPostModalOpen] = useState(false);
	const [currentCommentId, setCurrentCommentId] = useState(null);
	const navigate = useNavigate();

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
	const moveToUserProfile = (username) => {
		navigate(`/profile/${username}`);
	};
	const postModalOptions = [{ text: '삭제', onClick: handleDeleteComment }];

	return (
		<CommentSection>
			{comments.map((comment) => (
				<CommentItem key={comment.id}>
					<CommentProfileImg
						src={comment.author.image || userProfileImg}
						alt="사용자 프로필"
						onClick={() => moveToUserProfile(comment.author.username)}
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
