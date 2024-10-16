import './App.css';
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	Navigate,
	useLocation,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginEmailPage from './pages/LoginEmailPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import AddProductPage from './pages/AddProductPage';
import PostUploadPage from './pages/PostUploadPage';
import FollowerListPage from './pages/FollowerListPage';
import FollowingListPage from './pages/FollowerListPage';
import PostListPage from './pages/PostListPage';
import SearchPage from './pages/SearchPage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';

function App() {
	return (
		<BrowserRouter>
			<Link to="/"> 메인(홈) </Link>
			<Link to="/login"> 로그인 </Link>
			<Link to="/signup"> 회원가입 </Link>
			<Link to="/product/add"> 상품등록 </Link>
			<Link to="/profile"> 내 프로필 </Link>
			<Link to="/Follower"> 팔로우 </Link>
			<Link to="/Following"> 팔로윙 </Link>

			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login/email" element={<LoginEmailPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/profile/edit" element={<EditProfilePage />} />
				<Route path="/post/upload" element={<PostUploadPage />} />
				<Route path="/product/add" element={<AddProductPage />} />
				<Route path="/follower" element={<FollowerListPage />} />
				<Route path="/following" element={<FollowingListPage />} />
				<Route path="/post" element={<PostListPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/post/:id" element={<PostDetailPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
