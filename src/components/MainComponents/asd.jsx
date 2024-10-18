import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeartIcon from '../../assets/icons/icon-feed-heart.svg';
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
  filter: brightness(0) invert(0);/* 필터로 색상변경 */
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
/* 모달 스타일 끝*/
const FeedItem = ({ content, postImgSrc, author, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 추가

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

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 게시글 수정 처리 (콘솔에 로그 출력)
  const handleEditPost = () => {
    console.log('게시글 수정');
    closeModal();
  };

  // 게시글 삭제 처리 (콘솔에 로그 출력)
  const handleDeletePost = () => {
    console.log('게시글 삭제');
    closeModal();
  };

  return (
    <FeedWrapper onClick={onClick}>
      <NavRightButton onClick={(e) => { e.stopPropagation(); openModal(); /* 클릭 이벤트 전파 방지 및 모달 열기 */ }}>
      </NavRightButton>
      <ProfileSection>
        <ProfileImage src={author.image || ProfileImg} alt="Profile" />
        <ProfileName>{author.accountname || 'Unknown User'}</ProfileName> {/* 기본값 추가 */}
      </ProfileSection>
      <PostContent>{content}</PostContent>
      {imageLoaded && hasImage && (
        <PostImageWrapper>
          <PostImage src={postImgSrc} alt="Post" />
        </PostImageWrapper>
      )}
      <ReactionIcons>
        <IconButton>
          <img src={HeartIcon} alt="Heart" />
        </IconButton>
        <IconButton>
          <img src={MessageIcon} alt="Message" />
        </IconButton>
      </ReactionIcons>

      {/* 모달 */}
      {isModalOpen && (
        <ModalBackground onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalButton onClick={handleEditPost}>게시글 수정</ModalButton>
            <ModalButton onClick={handleDeletePost}>게시글 삭제</ModalButton>
            <ModalButton onClick={closeModal}>닫기</ModalButton>
          </ModalContent>
        </ModalBackground>
      )}
    </FeedWrapper>
  );
};

export default FeedItem;
