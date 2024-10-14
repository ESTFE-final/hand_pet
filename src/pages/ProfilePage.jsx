import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
	min-height: 100vh;
`;

const ProfilePage = () => {
	const [isPostModalOpen, setIsPostModalOpen] = useState(false);
	const [postModalOptions, setPostModalOptions] = useState([]);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

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
			<Profile openModal={openPostModal} onLogout={handleLogout} />
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
