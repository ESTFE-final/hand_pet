import React from 'react';
import styled from 'styled-components';
import HeartIcon from '../../icons/icon-feed-heart.svg';
import MessageIcon from '../../icons/icon-feed-message.svg';
import ProfileImg from '../../icons/icon-main-feed-profile.png';
import PostImg1 from '../../icons/img-main-feed(1).png';
import PostImg2 from '../../icons/img-main-feed(2).png';

const FeedWrapper = styled.div`
	width: 100%;
	max-width: 716px;
	margin: 0 auto;
	padding: 16px;
	background-color: #fff;
	border: 1px solid #dbdbdb;
	border-radius: 8px;
	margin-bottom: 24px;
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
	font-size: 2rem;
	margin-bottom: 12px;
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

const MainFeed = () => {
	return (
		<>
			<FeedWrapper>
				<ProfileSection>
					<ProfileImage src={ProfileImg} alt="Profile" />
					<ProfileName>애완 간식 수제샵</ProfileName>
				</ProfileSection>
				<PostContent>수제 케이크 예약 가능합니다!</PostContent>
				<PostImage src={PostImg1} alt="Post" />
				<ReactionIcons>
					<IconButton>
						<img src={HeartIcon} alt="Heart" />
					</IconButton>
					<IconButton>
						<img src={MessageIcon} alt="Message" />
					</IconButton>
				</ReactionIcons>
			</FeedWrapper>
			<FeedWrapper>
				<ProfileSection>
					<ProfileImage src={ProfileImg} alt="Profile" />
					<ProfileName>애완 간식 수제샵</ProfileName>
				</ProfileSection>
				<PostContent>강아지 케이크 예약 가능합니다!</PostContent>
				<PostImage src={PostImg2} alt="Post" />
				<ReactionIcons>
					<IconButton>
						<img src={HeartIcon} alt="Heart" />
					</IconButton>
					<IconButton>
						<img src={MessageIcon} alt="Message" />
					</IconButton>
				</ReactionIcons>
			</FeedWrapper>
		</>
	);
};

export default MainFeed;
