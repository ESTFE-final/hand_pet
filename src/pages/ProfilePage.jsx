import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import axios from 'axios';
import Profile from '../components/ProfileComponents/Profile';
import UserContent from '../components/ProfileComponents/UserContent';
import { PostModal } from '../components/SharedComponents/CommonComponents';
import TabNaviComponent from '../components/TabMenuComponents/TabNavi';

const PageWrapper = styled.div`
	position: relative;
	min-height: 100vh;
`;

const ProfilePage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalOptions, setModalOptions] = useState([]);

	const openModal = (options) => {
		setModalOptions(options);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<PageWrapper>
			<Profile openModal={openModal} />
			<UserContent />
			<PostModal
				isOpen={isModalOpen}
				onClose={closeModal}
				options={modalOptions}
			/>
			<TabNaviComponent />
		</PageWrapper>
	);
};

export default ProfilePage;
