import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationBar } from '../SharedComponents/CommonComponents';
import profileImage from '../../assets/icons/profile-img.svg';
import messageIcon from '../../assets/icons/message-btn.svg';
import shareIcon from '../../assets/icons/share-btn.svg';
import leftArrowIcon from '../../assets/icons/icon-arrow-left-w.svg';
import RightmenuIcon from '../../assets/icons/icon-more-vertical.svg';

const ProfileWrapper = styled.article`
	background-color: var(--primary);
	border-radius: 0 0 40px 40px;
`;

const CustomProfileNavBar = styled(NavigationBar)`
	background-color: transparent;
	border: none;
	padding: 16px;
	margin-bottom: 8px;

	.nav-left-button {
		background: url(${leftArrowIcon}) no-repeat;
		background-size: contain;
		width: 22px;
		height: 22px;
	}

	.nav-right-button {
		background: url(${RightmenuIcon}) no-repeat;
		background-size: contain;

		width: 24px;
		height: 24px;
	}
`;

const ProfileMain = styled.section`
	padding: 0 26px 27px 26px;
`;

const ProfileInfo = styled.div`
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

const UserImage = styled(Link)`
	width: 74px;
	height: 74px;
	border-radius: 50%;
	border: 1px solid var(--gray);
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const ProfileName = styled.div`
	.profile-username {
		color: var(--white);
		font-size: 1.8rem;
		margin-bottom: 5px;
	}

	.profile-account {
		font-size: 1.2rem;
		color: var(--redlight);
	}
`;

const ProfileButtons = styled.div`
	.message-btn,
	.share-btn {
		width: 34px;
		height: 34px;
		background-repeat: no-repeat;
		background-position: center;
	}

	.message-btn {
		background-image: url(${messageIcon});
		background-size: 34px;
		margin-right: 16px;
	}

	.share-btn {
		background-image: url(${shareIcon});
		background-size: 34px;
	}
`;

const ProfileIntro = styled.p`
	font-size: 1.3rem;
	color: var(--white);
`;

const ProfileStats = styled.section`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 25px 38px;
	border-radius: 30px;
	background-color: rgba(255, 255, 255, 0.5);
	margin-top: 27px;
`;

const ProfileFollow = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: all 0.2s ease;

	.stat-value {
		font-weight: bold;
	}

	.stat-label {
		font-size: 1.1rem;
		color: var(--graydark-200);
	}

	&:hover {
		color: var(--white);
	}
`;

const ProductLink = styled(Link)`
	background-color: var(--white);
	border: 1px solid var(--gray);
	color: var(--black);
	border-radius: 30px;
	padding: 9px 22px;
	font-size: 1.2rem;
	transition: all 0.2s ease;

	&:hover {
		background-color: var(--gray);
	}
`;

const EditProfileLink = styled(Link)`
	background-color: var(--white);
	border: 1px solid var(--gray);
	color: var(--black);
	border-radius: 30px;
	padding: 9px 22px;
	font-size: 1.2rem;
	transition: all 0.2s ease;

	&:hover {
		background-color: var(--gray);
	}
`;

const FollowButton = styled.button`
	background-color: ${(props) =>
		props.isFollowing ? 'var(--white)' : 'var(--primary)'};
	border: 1px solid
		${(props) => (props.isFollowing ? 'var(--gray)' : 'var(--primary)')};
	color: ${(props) => (props.isFollowing ? 'var(--gray-300)' : 'var(--white)')};
	border-radius: 30px;
	padding: 9px 22px;
	font-size: 1.2rem;
	transition: all 0.2s ease;
	width: 88px;

	&:active {
		opacity: 0.8;
	}
`;

const Profile = ({
	profile,
	openModal,
	onLogout,
	isMyProfile,
	onFollow,
	onUnFollow,
}) => {
	if (!profile) return null;

	const {
		username,
		accountname,
		intro,
		image,
		isfollow,
		followerCount,
		followingCount,
	} = profile;

	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1); // 이전 페이지로 이동
	};
	// 하얀색 뒤로가기 버튼 활성화

	const rightBtnClick = () => {
		openModal([
			{ text: '설정 및 개인정보', onClick: () => {} },
			{ text: '로그아웃', onClick: onLogout },
		]);
	};

	return (
		<ProfileWrapper>
			<CustomProfileNavBar
				leftButton={
					<div className="nav-left-button" onClick={handleBackClick}></div>
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
						<UserImage to={`/profile/${accountname}`}>
							<img
								src={image || profileImage}
								alt={`${username}의 프로필 이미지`}
							/>
						</UserImage>
						<ProfileName>
							<h1 className="profile-username">{username}</h1>
							<p className="profile-account">@ {accountname}</p>
						</ProfileName>
					</ProfileInfoText>
					{isMyProfile ? (
						<ProductLink to="/product/add">상품등록</ProductLink>
					) : (
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
					)}
				</ProfileInfo>
				<ProfileIntro>{intro}</ProfileIntro>
				<ProfileStats>
					<ProfileFollow to={`/follower/${accountname}`}>
						<span className="stat-value">{followerCount}</span>
						<span className="stat-label">팔로워</span>
					</ProfileFollow>
					<ProfileFollow to={`/following/${accountname}`}>
						<span className="stat-value">{followingCount}</span>
						<span className="stat-label">팔로잉</span>
					</ProfileFollow>
					{isMyProfile ? (
						<EditProfileLink to="/profile/edit">프로필 편집</EditProfileLink>
					) : (
						<FollowButton
							isFollowing={isfollow}
							onClick={() => (isfollow ? onUnFollow() : onFollow())}
						>
							{isfollow ? '언팔로우' : '팔로우'}
						</FollowButton>
					)}
				</ProfileStats>
			</ProfileMain>
		</ProfileWrapper>
	);
};

export default Profile;
