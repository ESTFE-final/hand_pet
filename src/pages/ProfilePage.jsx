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

const PageWrapper = styled.div`
	position: relative;
`;

const ProfilePage = () => {
	const [isPostModalOpen, setIsPostModalOpen] = useState(false);
	const [postModalOptions, setPostModalOptions] = useState([]);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [profileData, setProfileData] = useState(null);

	const { accountname } = useParams();

	useEffect(() => {
		const fetchProfileData = async () => {
			const token = localStorage.getItem('authToken');
			if (!token) return;

			try {
				const response = await axios.get(
					`https://estapi.mandarin.weniv.co.kr/profile/${accountname || ''}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					}
				);
				setProfileData(response.data.profile);
			} catch (error) {
				console.error('프로필 가져오기 실패:', error);
			}
		};

		fetchProfileData();
	}, [accountname]);

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
				isMyProfile={!accountname}
			/>
			<UserContent />
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
		</PageWrapper>
	);
};

export default ProfilePage;
