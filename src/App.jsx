import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SplashScreenPage from './pages/SplashScreenPage';
import MainPage from './pages/MainPage';
import LoginEmailPage from './pages/LoginEmailPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import AddProductPage from './pages/AddProductPage';
import PostUploadPage from './pages/PostUploadPage';
import FollowerListPage from './pages/FollowerListPage';
import FollowingListPage from './pages/FollowingListPage';
import PostListPage from './pages/PostListPage';
import SearchPage from './pages/SearchPage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import NewProfilePage from './pages/NewProfilePage';
import Postsu from './pages/Postsu';
import ProductPage from './pages/ProductPage';
import ProductEditPage from './pages/ProductEditPage';
import ChatListPage from './pages/ChatListPage';
import NotFoundPage from './pages/NotFoundPage';
import ChatRoom from './pages/ChatRoomPage';

function AppContent() {
	const [showSplash, setShowSplash] = useState(
		() => !localStorage.getItem('splashShown')
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (!showSplash) {
			localStorage.setItem('splashShown', 'true');
		}
	}, [showSplash]);

	const handleSplashFinish = () => {
		setShowSplash(false);
		navigate('/');
	};

	if (showSplash) {
		return <SplashScreenPage onFinish={handleSplashFinish} />;
	}

	return (
		<>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login/email" element={<LoginEmailPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/profile/:accountname" element={<ProfilePage />} />
				<Route path="/profile/edit" element={<EditProfilePage />} />
				<Route path="/profile/new" element={<NewProfilePage />} />
				<Route path="/post/upload" element={<PostUploadPage />} />
				<Route path="/product/add" element={<AddProductPage />} />
				<Route path="/follower/:accountname" element={<FollowerListPage />} />
				<Route path="/following/:accountname" element={<FollowingListPage />} />
				<Route path="/chatlist" element={<ChatListPage />} />
				<Route path="/post" element={<PostListPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/post/:id" element={<PostDetailPage />} />
				<Route path="/postsu/:post_id" element={<Postsu />} />
				<Route path="/product/:product_id" element={<ProductPage />} />
				<Route path="/product/edit/:product_id" element={<ProductEditPage />} />
				<Route path="/chatlist" element={<ChatListPage />} />
				<Route path="/chat/:userId" element={<ChatRoom />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}

export default App;
