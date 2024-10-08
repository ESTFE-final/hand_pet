import React from 'react';
import styled from 'styled-components';
import { NavigationBar } from '../SharedComponents/CommonComponents';
import Button from '../SharedComponents/Button';
import profileImage from '../../icons/profile-img.svg';
import messageIcon from '../../icons/message-btn.svg';
import shareIcon from '../../icons/share-btn.svg';

const dummyProfile = {
	username: '애완 간식 수제샵',
	accountname: '@pet_handmade',
	intro: '모든 제품은 직접 디자인하고 제작합니다 :)',
	image: profileImage,
	isfollow: false,
	followerCount: 2950,
	followingCount: 128,
};

const ProfileMain = styled.article`
	background-color: var(--primary);
	border-radius: 0 0 40px 40px;
	padding: 48px 26px 27px 26px;
`;

const ProfileNavBar = styled.div`
	.common-nav {
		background-color: #ff3239;
	}
`;

const ProfileInfo = styled.section`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 23px;
	color: var(--white);
`;

const ProfileInfoText = styled.div`
	display: flex;
	align-items: center;
	gap: 17px;
`;

const ProfileName = styled.div`
	.profile-username {
		color: var(--white);
		font-size: 2.5rem;
	}

	.profile-account {
		font-size: 1.9rem;
		color: var(--redlight);
	}
`;

const ProfileButtons = styled.div`
	.message-btn,
	.share-btn {
		width: 60px;
		height: 60px;
		background-repeat: no-repeat;
		background-position: center;
	}

	.message-btn {
		background-image: url(${messageIcon});
		background-size: 60px;
		margin-right: 16px;
	}

	.share-btn {
		background-image: url(${shareIcon});
		background-size: 60px;
	}
`;

const ProfileIntro = styled.p`
	font-size: 2.3rem;
	color: var(--white);
`;

const ProfileStats = styled.section`
	display: flex;
	justify-content: space-around;
	padding: 24px 28px;
	border-radius: 30px;
	background-color: rgba(255, 255, 255, 0.5);
	margin-top: 28px;
`;

const ProfileFollow = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.stat-value {
		font-size: 2.3rem;
		font-weight: bold;
	}

	.stat-label {
		font-size: 2rem;
		color: var(--graydark-200);
	}
`;

const Profile = ({ profile = dummyProfile }) => {
	const {
		username,
		accountname,
		intro,
		image,
		isfollow,
		followerCount,
		followingCount,
	} = profile;

	const MenuButton = () => {
		<button type="button" aria-label="더보기 메뉴"></button>;
	};

	return (
		<ProfileMain>
			<ProfileNavBar>
				<NavigationBar rightButton={<MenuButton />} />
			</ProfileNavBar>

			<ProfileInfo>
				<ProfileInfoText>
					<a href="#">
						<img src={image} alt={`${username}의 프로필 이미지`} />
					</a>
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
	);
};

export default Profile;
