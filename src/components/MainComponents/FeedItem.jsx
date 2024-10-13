import React from 'react';
import styled from 'styled-components';
import HeartIcon from '../../assets/icons/icon-feed-heart.svg';
import MessageIcon from '../../assets/icons/icon-feed-message.svg';
import ProfileImg from '../../assets/icons/profile-img.svg';
import { Link } from 'react-router-dom';

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

const FeedItem = ({ content, postImgSrc }) => {
	return (
		<Link to="/post/1">
			<FeedWrapper>
				<ProfileSection>
					<ProfileImage src={ProfileImg} alt="Profile" />
					<ProfileName>애완 간식 수제샵</ProfileName>
				</ProfileSection>
				<PostContent>{content}</PostContent>
				<PostImage src={postImgSrc} alt="Post" />
				<ReactionIcons>
					<IconButton>
						<img src={HeartIcon} alt="Heart" />
					</IconButton>
					<IconButton>
						<img src={MessageIcon} alt="Message" />
					</IconButton>
				</ReactionIcons>
			</FeedWrapper>
		</Link>
	);
};

export default FeedItem;