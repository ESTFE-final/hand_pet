import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Profile from '../components/ProfileComponents/Profile';
import UserContent from '../components/ProfileComponents/UserContent';

const ProfilePage = () => (
	<div>
		<Profile />
		<UserContent />
	</div>
);

export default ProfilePage;
