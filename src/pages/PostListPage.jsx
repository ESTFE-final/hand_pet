import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainEmptyFeed from '../components/MainComponents/MainEmptyFeed';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import MainFeed from '../components/MainComponents/MainFeed';

// 팔로잉 유저의 피드를 가져오는 함수
const fetchFollowingFeed = async (token, limit, skip) => {
	try {
		const response = await axios.get(
			`https://estapi.mandarin.weniv.co.kr/post/feed/?limit=${limit}&skip=${skip}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data.posts; // 가져온 게시물 반환
	} catch (error) {
		console.error('Error fetching following feed:', error);
		return []; // 오류 발생 시 빈 배열 반환
	}
};

// 프로필 정보를 가져오는 함수
const fetchProfile = async (token, accountname) => {
	try {
		const response = await axios.get(
			`https://estapi.mandarin.weniv.co.kr/profile/${accountname}`, // accountname을 포함한 URL
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data.profile; // 가져온 프로필 반환
	} catch (error) {
		console.error('Error fetching profile:', error);
		return null; // 오류 발생 시 null 반환
	}
};

const PostListPage = () => {
	const [posts, setPosts] = useState([]); // 게시물 상태
	const [limit] = useState(10); // 한 번에 가져올 게시물 수
	const [skip, setSkip] = useState(0); // 페이징을 위한 스킵 값
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // 인증 상태 확인
	let token = useSelector((state) => state.auth.token); // 인증 토큰
	const navigate = useNavigate();

	useEffect(() => {
		// 인증 상태와 토큰 확인
		if (!isAuthenticated && !token) {
			const storedToken = localStorage.getItem('authToken'); // 로컬 스토리지에서 토큰 가져오기
			if (!storedToken) {
				navigate('/login'); // 로그인 페이지로 이동
				return; // 더 이상 코드를 실행하지 않음
			}
			token = storedToken;
		}

		const getPosts = async () => {
			const fetchedPosts = await fetchFollowingFeed(token, limit, skip); // 팔로잉 피드 가져오기
			setPosts(fetchedPosts); // 게시물 상태 업데이트

			// 각 게시물의 accountname을 사용하여 프로필 정보를 가져오기
			const postsWithProfiles = await Promise.all(
				fetchedPosts.map(async (post) => {
					const profile = await fetchProfile(token, post.author.accountname); // 프로필 정보 가져오기
					return {
						...post,
						authorProfile: profile, // 프로필 정보 추가
					};
				})
			);
			setPosts(postsWithProfiles); // 업데이트된 게시물 상태 설정
		};

		getPosts();
	}, [isAuthenticated, token, navigate, limit, skip]); // skip, limit 값이 변경될 때마다 재요청

	const loadMorePosts = () => {
		setSkip(skip + limit); // 더 많은 게시물을 가져오기 위해 skip 값 증가
	};

	const handlePostClick = (postId) => {
		navigate(`/post/${postId}`); // 게시물 상세 페이지로 이동
	};

	// 좋아요 데이터 가져오기
	const handleLike = async (postId) => {
		const token = localStorage.getItem('authToken');
		try {
			const response = await axios.post(
				`https://estapi.mandarin.weniv.co.kr/post/${postId}/heart`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			updateLike(postId, true, response.data.post.heartCount);
		} catch (error) {
			console.error('좋아요 오류:', error);
		}
	};

	// 좋아요 취소
	const handleUnLike = async (postId) => {
		const token = localStorage.getItem('authToken');
		try {
			const response = await axios.delete(
				`https://estapi.mandarin.weniv.co.kr/post/${postId}/unheart`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			updateLike(postId, false, response.data.post.heartCount);
		} catch (error) {
			console.error('좋아요 취소 오류:', error);
		}
	};

	const updateLike = (postId, isLiked, newHeartCount) => {
		setPosts((prevPosts) =>
			prevPosts.map((post) =>
				post.id == postId
					? { ...post, hearted: isLiked, heartCount: newHeartCount }
					: post
			)
		);
	};

	return (
		<>
			<NavigationBar title={'핸드펫 피드'} />
			{posts.length > 0 ? (
				<>
					<MainFeed
						posts={posts}
						onPostClick={handlePostClick}
						onLike={handleLike}
						onUnLike={handleUnLike}
					/>{' '}
					{/* MainFeed에 posts와 클릭 핸들러 전달 */}
					<button onClick={loadMorePosts}>더 보기</button> {/* 더 보기 버튼 */}
				</>
			) : (
				<MainEmptyFeed />
			)}
		</>
	);
};

export default PostListPage;
