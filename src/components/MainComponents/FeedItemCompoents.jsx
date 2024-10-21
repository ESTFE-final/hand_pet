import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import HeartIcon from '../../assets/icons/icon-feed-heart.svg';
import HeartFillIcon from '../../assets/icons/icon-heart.svg';
import MessageIcon from '../../assets/icons/icon-feed-message.svg';
import ProfileImg from '../../assets/icons/profile-img.svg';
import RightmenuIcon from '../../assets/icons/s-icon-more-vertical.svg';

const FeedWrapper = styled.div`
	max-width: 480px;
	margin: 20px 16px 24px 16px;
	background-color: #fff;
	position: relative;
	cursor: pointer;
`;

const ProfileSection = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 12px;
	cursor: pointer;
`;

const profilecontainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const ProfileImage = styled.img`
	width: 43px;
	height: 43px;
	border-radius: 50%;
	margin-right: 12px;
`;

const ProfileuserName = styled.div`
	font-size: 1.5rem;
	color: #555555;
`;
const ProfileaccountName = styled.div`
	font-size: 1.4rem;
	color: #B4B4B4;
	margin-top: 4px;
`;


const PostContent = styled.div`
	font-size: 1.5rem;
	margin-bottom: 15px;
`;

const PostImageWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const PostImage = styled.img`
	width: 100%;
	height: 246px;
	border-radius: 8px;
	margin-bottom: 12px;
	object-fit: cover;
`;

const ReactionIcons = styled.div`
	display: flex;
	align-items: center;
`;

const IconButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	margin-right: 12px;
	display: flex;
	align-items: center;

	img {
		width: 20px;
		height: 20px;
	}
`;

const heartBeat = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const HeartIconWrapper = styled.div`
	display: inline-block;
	animation: ${(props) => (props.animate ? heartBeat : 'none')} 0.3s ease-in-out;
`;

const NavRightButton = styled.button`
	background: url(${RightmenuIcon}) no-repeat;
	background-size: contain;
	width: 18px;
	height: 18px;
	position: absolute;
	top: 16px;
	right: 0;
`;

const LikeCount = styled.span`
	font-size: 1.2rem;
	color: var(--gray-300);
	margin-left: 6px;
	margin-top: 1px;
`;

const CommentCount = styled.span`
	font-size: 1.2rem;
	color: var(--gray-300);
	margin-left: 6px;
	margin-top: 1px;
`;

const FeedItemCompoents = ({
	content,
	postImgSrc,
	author,
	postId,
	hearted,
	heartCount,
	onLike,
	onUnlike,
	onPostClick,
	onMoreClick,
	showNavRightButton = true,
	commentCount,
}) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [hasImage, setHasImage] = useState(false);
	const [animateHeart, setAnimateHeart] = useState(false);

	useEffect(() => {
		if (postImgSrc) {
			const img = new Image();
			img.onload = () => {
				setHasImage(true);
				setImageLoaded(true);
			};
			img.onerror = () => {
				setHasImage(false);
				setImageLoaded(true);
			};
			img.src = postImgSrc;
		} else {
			setHasImage(false);
			setImageLoaded(true);
		}
	}, [postImgSrc]);

	const handleLikeClick = (e) => {
		e.stopPropagation();
		setAnimateHeart(true);
		setTimeout(() => setAnimateHeart(false), 300);
		if (hearted) {
			onUnlike(postId);
		} else {
			onLike(postId);
		}
	};

	return (
		<FeedWrapper onClick={() => onPostClick(postId)}>
			{showNavRightButton && (
				<NavRightButton
					onClick={(e) => {
						e.stopPropagation();
						onMoreClick(postId);
					}}
				>
					{/* 우측 버튼 클릭 시 모달 띄우기 */}
				</NavRightButton>
			)}

			<ProfileSection
				onClick={(e) => {
					onPostClick(postId);
				}}
			>
				<ProfileImage src={author.image || ProfileImg} alt="Profile" />
				<profilecontainer>
					<ProfileuserName>{author.username || 'Unknown User'}</ProfileuserName>
					<ProfileaccountName>@{author.accountname || 'Unknown User'}</ProfileaccountName>
				</profilecontainer>
			</ProfileSection>

			<PostContent>{content}</PostContent>
			{imageLoaded && hasImage && (
				<PostImageWrapper>
					<PostImage src={postImgSrc} alt="Post" />
				</PostImageWrapper>
			)}
			<ReactionIcons>
				<IconButton onClick={handleLikeClick}>
					<HeartIconWrapper animate={animateHeart}>
						<img src={hearted ? HeartFillIcon : HeartIcon} alt="Heart" />
					</HeartIconWrapper>
					<LikeCount>{heartCount}</LikeCount>
				</IconButton>
				<IconButton>
					<img src={MessageIcon} alt="Message" />
					<CommentCount>{commentCount}</CommentCount>
				</IconButton>
			</ReactionIcons>
		</FeedWrapper>
	);
};

export default FeedItemCompoents;
