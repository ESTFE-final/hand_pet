import './App.css';
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginEmailPage from './pages/LoginEmailPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import AddProductPage from './pages/AddProductPage';
import PostUploadPage from './pages/PostUploadPage';
import FollowerListPage from './pages/FollowerListPage';
import LoginPage from './pages/LoginPage'; 
import NewprofilePage from './pages/NewprofilePage';
function App() {
	return (
		<BrowserRouter>
			{/* 네비게이션 링크 */}
			{/* <Link to="/"> 메인(홈) </Link> */}
			<Link to="/login"> 로그인 </Link>
			<Link to="/loginemail"> 이메일 </Link>
			<Link to="/signup"> 회원가입 </Link>
			{/* {/* <Link to="/myprofile"> 내 프로필 </Link>
			<Link to="/profile/user"> 유저 프로필 </Link> } */}

			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} /> 
				<Route path="/newprofile" element={<NewprofilePage />} /> 
				<Route path="/loginemail" element={<LoginEmailPage />} /> 
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/editprofile" element={<EditProfilePage />} />
				<Route path="/postupload" element={<PostUploadPage />} />
				<Route path="/addproduct" element={<AddProductPage />} />
				<Route path="/follower" element={<FollowerListPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
