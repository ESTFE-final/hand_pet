import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeartIcon from '../../assets/icons/icon-feed-heart.svg';
import HeartFillIcon from '../../assets/icons/icon-heart.svg';
import MessageIcon from '../../assets/icons/icon-feed-message.svg';
import ProfileImg from '../../assets/icons/profile-img.svg';
import RightmenuIcon from '../../assets/icons/icon-more-vertical.svg';

const FeedWrapper = styled.div`
	width: 100%;
	max-width: 716px;
	margin: 0 auto;
	padding: 16px;
	background-color: #fff;
	border: 1px solid #dbdbdb;
	border-radius: 8px;
	margin-bottom: 24px;
	position: relative; /* position 속성 추가 */
`;

const ProfileSection = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 12px;
`;

const ProfileImage = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 12px;
`;

const ProfileName = styled.div`
	font-size: 2rem;
	color: #555555;
`;

const PostContent = styled.div`
	font-size: 1.6rem; /* 글씨 크기 조정 */
	margin-bottom: 12px;
`;

const PostImageWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const PostImage = styled.img`
	width: 100%;
	border-radius: 8px;
	margin-bottom: 12px;
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
		width: 24px;
		height: 24px;
	}
`;

const NavRightButton = styled.button`
	background: url(${RightmenuIcon}) no-repeat;
	background-size: contain;
	width: 48px;
	height: 48px;
	position: absolute; /* 절대 위치 설정 */
	top: 16px; /* 상단 위치 조정 */
	right: 16px; /* 오른쪽 위치 조정 */
	border: none; /* 버튼 기본 스타일 제거 */
	cursor: pointer; /* 커서 모양 변경 */
	filter: brightness(0) invert(0);
`;

const LikeCount = styled.span`
	font-size: 2.2rem;
	color: var(--gray-300);
	margin-left: 12px;
`;

const FeedItem = ({
	content,
	postImgSrc,
	author,
	onClick,
	hearted,
	heartCount,
	onLike,
	onUnlike,
}) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [hasImage, setHasImage] = useState(false);

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
		if (hearted) {
			onUnlike();
		} else {
			onLike();
		}
	};

	return (
		<FeedWrapper onClick={onClick}>
			<NavRightButton
				onClick={(e) => {
					e.stopPropagation(); /* 클릭 이벤트 전파 방지 */
				}}
			>
				{/* 우측 버튼 클릭 시 이벤트 추가 가능 */}
			</NavRightButton>
			<ProfileSection>
				<ProfileImage src={author.image || ProfileImg} alt="Profile" />
				<ProfileName>{author.accountname || 'Unknown User'}</ProfileName>{' '}
				{/* 기본값 추가 */}
			</ProfileSection>
			<PostContent>{content}</PostContent>
			{imageLoaded && hasImage && (
				<PostImageWrapper>
					<PostImage src={postImgSrc} alt="Post" />
				</PostImageWrapper>
			)}
			<ReactionIcons>
				<IconButton onClick={handleLikeClick}>
					<img src={hearted ? HeartFillIcon : HeartIcon} alt="Heart" />
					<LikeCount>{heartCount}</LikeCount>
				</IconButton>
				<IconButton>
					<img src={MessageIcon} alt="Message" />
				</IconButton>
			</ReactionIcons>
		</FeedWrapper>
	);
};

export default FeedItem;
