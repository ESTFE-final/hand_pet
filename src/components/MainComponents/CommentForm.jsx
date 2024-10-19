import React, { useState } from 'react';
import styled from 'styled-components';
import userProfileImg from '../../assets/icons/profile-img.svg';
import uploadIcon from '../../assets/icons/icon-feed-upload.svg';

const CommentFormWrapper = styled.form`
	display: flex;
	align-items: center;
	padding: 13px 36px;
	background-color: white;
	border-top: 1px solid #e0e0e0;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
`;

const CommentProfileImg = styled.img`
	width: 54px;
	height: 54px;
	border-radius: 50%;
`;

const CommentInput = styled.input`
	flex: 1;
	padding: 20px 0;
	font-size: 2.4rem;
	margin-left: 18px;

	&::placeholder {
		color: var(--gray-200);
	}
`;

const CommentSubmit = styled.button`
	color: var(--gray-200);
	font-size: 2.4rem;
	margin-left: 10px;
	padding: 10px;
`;

const UploadIcon = styled.img`
	width: 30px;
	height: 30px;
`;

const CommentForm = () => {
	const [comment, setComment] = useState('');

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (comment.trim()) {
			setComment('');
		}
	};

	return (
		<CommentFormWrapper>
			<CommentProfileImg src={userProfileImg} alt="사용자 프로필" />
			<CommentInput
				type="text"
				placeholder="댓글 입력하기..."
				value={comment}
				onChange={handleCommentChange}
			/>
			<CommentSubmit type="submit" hasContent={comment.trim().length > 0}>
				{comment.trim().length > 0 ? (
					<UploadIcon src={uploadIcon} alt="댓글 업로드" />
				) : (
					'게시'
				)}
			</CommentSubmit>
		</CommentFormWrapper>
	);
};

export default CommentForm;
