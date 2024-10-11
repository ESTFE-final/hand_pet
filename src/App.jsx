import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LoginEmailPage from './pages/LoginEmailPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import AddProductPage from './pages/AddProductPage';
import PostUploadPage from './pages/PostUploadPage';
import FollowerListPage from './pages/FollowerListPage';
import PostListPage from './pages/PostListPage';
import SearchPage from './pages/SearchPage';
import NewprofilePage from './pages/NewprofilePage';

function App() {
	return (
		<BrowserRouter>
			<Link to="/"> 메인(홈) </Link>
			<Link to="/login"> 로그인 </Link>
			<Link to="/signup"> 회원가입 </Link>
			<Link to="/profile"> 내 프로필 </Link>

			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginEmailPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/editprofile" element={<EditProfilePage />} />
				<Route path="/postupload" element={<PostUploadPage />} />
				<Route path="/addproduct" element={<AddProductPage />} />
				<Route path="/follower" element={<FollowerListPage />} />
				<Route path="/post" element={<PostListPage />} />
				<Route path="/newprofile" element={<NewprofilePage />} />
				<Route path="/search" element={<SearchPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
