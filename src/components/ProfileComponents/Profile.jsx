import React, { useState } from 'react';
import styled from 'styled-components';
import { NavigationBar, PostModal } from '../SharedComponents/CommonComponents';
import Button from '../SharedComponents/Button';
import profileImage from '../../icons/profile-img.svg';
import messageIcon from '../../icons/message-btn.svg';
import shareIcon from '../../icons/share-btn.svg';
import leftArrowIcon from '../../icons/icon-arrow-left-w.svg';
import RightmenuIcon from '../../icons/icon-more-vertical.svg';

const dummyProfile = {
	username: '애완 간식 수제샵',
	accountname: '@pet_handmade',
	intro: '모든 제품은 직접 디자인하고 제작합니다 :)',
	image: profileImage,
	isfollow: false,
	followerCount: 2950,
	followingCount: 128,
};

const ProfileWrapper = styled.article`
	background-color: var(--primary);
	border-radius: 0 0 80px 80px;
`;

const CustomProfileNavBar = styled(NavigationBar)`
	background-color: transparent;
	border: none;
	padding: 32px;

	.nav-left-button {
		background: url(${leftArrowIcon}) no-repeat;
		background-size: contain;
		width: 44px;
		height: 44px;
	}

	.nav-right-button {
		background: url(${RightmenuIcon}) no-repeat;
		background-size: contain;
		width: 48px;
		height: 48px;
	}
`;

const ProfileMain = styled.section`
	padding: 0 52px 54px 52px;
`;

const ProfileInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 46px;
	color: var(--white);
`;

const ProfileInfoText = styled.div`
	display: flex;
	align-items: center;
	gap: 34px;
`;

const UserImage = styled.a`
	width: 148px;
	height: 148px;
	border-radius: 50%;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const ProfileName = styled.div`
	.profile-username {
		color: var(--white);
		font-size: 2.8rem;
	}

	.profile-account {
		font-size: 2rem;
		color: var(--redlight);
	}
`;

const ProfileButtons = styled.div`
	.message-btn,
	.share-btn {
		width: 68px;
		height: 68px;
		background-repeat: no-repeat;
		background-position: center;
	}

	.message-btn {
		background-image: url(${messageIcon});
		background-size: 68px;
		margin-right: 32px;
	}

	.share-btn {
		background-image: url(${shareIcon});
		background-size: 68px;
	}
`;

const ProfileIntro = styled.p`
	font-size: 2.6rem;
	color: var(--white);
`;

const ProfileStats = styled.section`
	display: flex;
	justify-content: space-around;
	padding: 48px 56px;
	border-radius: 60px;
	background-color: rgba(255, 255, 255, 0.5);
	margin-top: 56px;
`;

const ProfileFollow = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.stat-value {
		font-size: 3rem;
		font-weight: bold;
	}

	.stat-label {
		font-size: 2rem;
		color: var(--graydark-200);
	}
`;

const Profile = ({ profile = dummyProfile, openModal }) => {
	const {
		username,
		accountname,
		intro,
		image,
		isfollow,
		followerCount,
		followingCount,
	} = profile;

	const rightBtnClick = () => {
		openModal([
			{ text: '설정 및 개인정보', onClick: () => {} },
			{ text: '로그아웃', onClick: () => {} },
		]);
	};

	return (
		<ProfileWrapper>
			<CustomProfileNavBar
				leftButton={
					<button className="nav-left-button" aria-label="뒤로 가기" />
				}
				rightButton={
					<button
						className="nav-right-button"
						aria-label="더보기 메뉴"
						onClick={rightBtnClick}
					/>
				}
			/>

			<ProfileMain>
				<ProfileInfo>
					<ProfileInfoText>
						<UserImage href="#">
							<img src={image} alt={`${username}의 프로필 이미지`} />
						</UserImage>
						<ProfileName>
							<h1 className="profile-username">{username}</h1>
							<p className="profile-account">{accountname}</p>
						</ProfileName>
					</ProfileInfoText>
					<ProfileButtons>
						<button
							type="button"
							aria-label="채팅하기"
							className="message-btn"
						></button>
						<button
							type="button"
							aria-label="공유하기"
							className="share-btn"
						></button>
					</ProfileButtons>
				</ProfileInfo>
				<ProfileIntro>{intro}</ProfileIntro>
				<ProfileStats>
					<ProfileFollow>
						<span className="stat-value">{followerCount}</span>
						<span className="stat-label">팔로워</span>
					</ProfileFollow>
					<ProfileFollow>
						<span className="stat-value">{followingCount}</span>
						<span className="stat-label">팔로잉</span>
					</ProfileFollow>
					{!isfollow && (
						<Button size="sm" className="follow-btn">
							팔로우
						</Button>
					)}
				</ProfileStats>
			</ProfileMain>
		</ProfileWrapper>
	);
};

export default Profile;
