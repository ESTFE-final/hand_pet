import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // 페이지 이동을 위해 추가
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

const ProfileImage = styled.img`
	width: 43px;
	height: 43px;
	border-radius: 50%;
	margin-right: 12px;
`;

const ProfileName = styled.div`
	font-size: 1.5rem;
	color: #555555;
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

/* 모달 스타일 */
const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

const ModalContent = styled.div`
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	width: 300px;
	text-align: center;
`;

const ModalButton = styled.button`
	margin-top: 10px;
	padding: 10px;
	border: none;
	border-radius: 5px;
	background-color: #f44336;
	color: white;
	cursor: pointer;
	width: 100%;
	margin-bottom: 10px;
`;

const CloseButton = styled.button`
	margin-top: 10px;
	padding: 10px;
	border: none;
	border-radius: 5px;
	background-color: #bbb;
	color: white;
	cursor: pointer;
	width: 100%;
`;

const LikeCount = styled.span`
	font-size: 1.2rem;
	color: var(--gray-300);
	margin-left: 6px;
	margin-top: 1px;
`;

const FeedItem = ({
	content,
	postImgSrc,
	author,
	postId,
	hearted,
	heartCount,
	onLike,
	onUnlike,
	onClick,
}) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [hasImage, setHasImage] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isAuthor, setIsAuthor] = useState(false);
	const [animateHeart, setAnimateHeart] = useState(false);
	const navigate = useNavigate(); // 페이지 이동을 위한 훅

	const currentUserAccountName = localStorage.getItem('accountname'); // 로그인된 유저 확인
	const token = localStorage.getItem('authToken'); // 토큰 가져오기

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

		// 게시글 작성자 확인
		if (author.accountname === currentUserAccountName) {
			setIsAuthor(true);
		}
	}, [postImgSrc, author, currentUserAccountName]);

	const handleDeletePost = async () => {
		if (isAuthor) {
			const confirmDelete = window.confirm('게시글을 삭제하시겠습니까?');
			if (confirmDelete) {
				try {
					await axios.delete(
						`https://estapi.mandarin.weniv.co.kr/post/${postId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-Type': 'application/json',
							},
						}
					);
					alert('게시글이 삭제되었습니다.');
					setShowModal(false); // 모달 닫기
					navigate(`/profile/`);
				} catch (error) {
					console.error('게시글 삭제 중 오류가 발생했습니다.', error);
				}
			}
		} else {
			alert('자신의 게시글만 삭제할 수 있습니다.');
		}
	};

	const handleEditPost = () => {
		if (isAuthor) {
			navigate(`/postsu/${postId}`); // postsu 페이지로 이동
		} else {
			alert('자신의 게시글만 수정할 수 있습니다.');
		}
	};

	const handleRightBtnClick = (e) => {
		e.stopPropagation(); // 클릭 이벤트 전파 방지
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleLikeClick = (e) => {
		e.stopPropagation();
		setAnimateHeart(true);
		setTimeout(() => setAnimateHeart(false), 300);
		if (hearted) {
			onUnlike();
		} else {
			onLike();
		}
	};

	const moveToUserProfile = (e) => {
		navigate(`/profile/${author.accountname}`);
	};

	return (
		<FeedWrapper onClick={onClick}>
			<NavRightButton onClick={handleRightBtnClick}>
				{/* 우측 버튼 클릭 시 모달 띄우기 */}
			</NavRightButton>

			{showModal && (
				<ModalBackground onClick={handleCloseModal}>
					<ModalContent onClick={(e) => e.stopPropagation()}>
						<ModalButton onClick={handleEditPost}>게시글 수정</ModalButton>
						<ModalButton onClick={handleDeletePost}>게시글 삭제</ModalButton>
						<CloseButton onClick={handleCloseModal}>닫기</CloseButton>
					</ModalContent>
				</ModalBackground>
			)}

			<ProfileSection onClick={moveToUserProfile}>
				<ProfileImage src={author.image || ProfileImg} alt="Profile" />
				<ProfileName>{author.accountname || 'Unknown User'}</ProfileName>
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
				</IconButton>
			</ReactionIcons>
		</FeedWrapper>
	);
};

export default FeedItem;
