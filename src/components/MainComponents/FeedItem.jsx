import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeartIcon from '../../assets/icons/icon-feed-heart.svg';
import MessageIcon from '../../assets/icons/icon-feed-message.svg';
import ProfileImg from '../../assets/icons/profile-img.svg';

const FeedWrapper = styled.div`
  // 스타일 코드 추가
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ProfileName = styled.span`
  font-weight: bold;
`;

const PostContent = styled.div`
  margin: 10px 0;
`;

const PostImageWrapper = styled.div`
  // 이미지 래퍼 스타일 추가
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const ReactionIcons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const FeedItem = ({ content, postImgSrc, onClick }) => {
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
      img.src = postImgSrc; // postImgSrc에 대한 유효성 검사
    } else {
      setHasImage(false);
      setImageLoaded(true);
    }
  }, [postImgSrc]);

  return (
    <FeedWrapper onClick={onClick}> {/* 클릭 시 onClick 호출 */}
      <ProfileSection>
        <ProfileImage src={ProfileImg} alt="Profile" />
        <ProfileName>애완 간식 수제샵</ProfileName>
      </ProfileSection>
      {/* 제목 부분 제거 */}
      {/* <PostContent>{content}</PostContent> */}
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
    </FeedWrapper>
  );
};

export default FeedItem;
