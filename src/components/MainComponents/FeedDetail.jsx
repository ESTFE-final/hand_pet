import React, { useState } from 'react';
import styled from 'styled-components';
import userProfileImg from '../../assets/icons/profile-img.svg';
import moreIcon from '../../assets/icons/more-vertical.svg';
import { PostModal } from '../SharedComponents/CommonComponents';
import { useNavigate } from 'react-router-dom';

const CommentSection = styled.div`
	padding: 20px 16px;
	margin-bottom: 30px;
`;

const CommentItem = styled.div`
	display: flex;
	align-items: flex-start;
	margin-bottom: 20px;
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
	margin: 4px 0 15px 0;
`;

const UserId = styled.span`
	font-size: 1.4rem;
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
	font-size: 1.4rem;
	margin-right: 38px;
`;

// 댓글 작성 시간
const formatTime = (dateString) => {
	const now = new Date();
	const date = new Date(dateString);

	const diffInMilliseconds = now - date;
	const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	if (diffInSeconds < 60) {
		return '방금 전';
	} else if (diffInMinutes < 60) {
		return `${diffInMinutes}분 전`;
	} else if (diffInHours < 24) {
		return `${diffInHours}시간 전`;
	} else if (diffInDays < 7) {
		return `${diffInDays}일 전`;
	} else {
		return date
			.toLocaleDateString('ko-KR', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
			.replace(/\. /g, '.')
			.slice(0, -1);
	}
};

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
							<CommentTime>{formatTime(comment.createdAt)}</CommentTime>
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
