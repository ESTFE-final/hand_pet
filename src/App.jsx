import './App.css';
import React, { useState } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useNavigate,
} from 'react-router-dom';
import SplashScreenPage from './pages/SplashScreenPage';
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
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import NewProfilePage from './pages/NewProfilePage';
import Postsu from './pages/Postsu';

function AppContent() {
	const [showSplash, setShowSplash] = useState(true);
	const navigate = useNavigate();

	const handleSplashFinish = () => {
		setShowSplash(false);
		navigate('/');
	};

	if (showSplash) {
		return <SplashScreenPage onFinish={handleSplashFinish} />;
	}

	return (
		<>
			<nav>
				<Link to="/"> 메인(홈) </Link>
				<Link to="/login"> 로그인 </Link>
				<Link to="/signup"> 회원가입 </Link>
				<Link to="/product/add"> 상품등록 </Link>
				<Link to="/profile"> 내 프로필 </Link>
			</nav>

			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login/email" element={<LoginEmailPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/profile/edit" element={<EditProfilePage />} />
				<Route path="/profile/new" element={<NewProfilePage />} />
				<Route path="/post/upload" element={<PostUploadPage />} />
				<Route path="/product/add" element={<AddProductPage />} />
				<Route path="/follower" element={<FollowerListPage />} />
				<Route path="/post" element={<PostListPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/post/:id" element={<PostDetailPage />} />
				<Route path="/postsu/:post_id" element={<Postsu />} />
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
