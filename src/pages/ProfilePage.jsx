import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Profile from '../components/ProfileComponents/Profile';
import UserContent from '../components/ProfileComponents/UserContent';
import {
	PostModal,
	AlertModal,
} from '../components/SharedComponents/CommonComponents';
import TabNaviComponent from '../components/TabMenuComponents/TabNavi';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
	position: relative;
`;

const API_URL = 'https://estapi.mandarin.weniv.co.kr';

const ProfilePage = () => {
	const [isPostModalOpen, setIsPostModalOpen] = useState(false);
	const [postModalOptions, setPostModalOptions] = useState([]);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [profileData, setProfileData] = useState(null);

	const { accountname } = useParams();
	const isMyProfile = !accountname;

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			navigate('/login', { replace: true });
		}
	}, [navigate]);

	useEffect(() => {
		fetchProfileData();
	}, [accountname]);

	// 프로필 데이터 가져오기
	const fetchProfileData = async () => {
		const token = localStorage.getItem('authToken');
		if (!token) return;

		try {
			let url;
			if (isMyProfile) {
				url = `${API_URL}/user/myinfo`;
			} else {
				url = `${API_URL}/profile/${accountname}`;
			}

			const res = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			setProfileData(isMyProfile ? res.data.user : res.data.profile);
		} catch (error) {
			console.error('프로필 가져오기 실패:', error);
			if (error.res && error.res.status === 404) {
				alert('해당 계정이 존재하지 않습니다.');
			}
		}
	};

	// 팔로우
	const followData = async () => {
		const token = localStorage.getItem('authToken');
		if (!token) return;

		if (isMyProfile) {
			alert('자기 자신을 팔로우 할 수 없습니다.');
			return;
		}

		try {
			const res = await axios.post(
				`${API_URL}/profile/${accountname}/follow`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			);
			setProfileData(res.data.profile);
		} catch (error) {
			console.error('팔로우 실패:', error);
		}
	};

	// 언팔로우
	const unFollowData = async () => {
		const token = localStorage.getItem('authToken');
		if (!token) return;

		try {
			const res = await axios.delete(
				`${API_URL}/profile/${accountname}/unfollow`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			);
			setProfileData(res.data.profile);
		} catch (error) {
			console.error('언팔로우 실패:', error);
		}
	};

	const openPostModal = (options) => {
		setPostModalOptions(options);
		setIsPostModalOpen(true);
	};

	const closePostModal = () => {
		setIsPostModalOpen(false);
	};

	const openAlertModal = () => {
		setIsAlertModalOpen(true);
	};

	const closeAlertModal = () => {
		setIsAlertModalOpen(false);
	};

	const handleLogout = () => {
		closePostModal();
		openAlertModal();
	};

	return (
		<PageWrapper>
			<Profile
				openModal={openPostModal}
				onLogout={handleLogout}
				profile={profileData}
				isMyProfile={isMyProfile}
				onFollow={followData}
				onUnFollow={unFollowData}
			/>
			<UserContent accountname={accountname} />
			<PostModal
				isOpen={isPostModalOpen}
				onClose={closePostModal}
				options={postModalOptions}
			/>
			<AlertModal
				modalShow={isAlertModalOpen}
				alertText="로그아웃하시겠습니까?"
				buttonText="로그아웃"
				modalClose={closeAlertModal}
			/>
			<TabNaviComponent />
		</PageWrapper>
	);
};

export default ProfilePage;
