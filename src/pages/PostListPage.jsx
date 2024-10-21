import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainEmptyFeed from '../components/MainComponents/MainEmptyFeed';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import MainFeed from '../components/MainComponents/MainFeed';
import Button from '../components/SharedComponents/Button';
import TabNaviComponent from '../components/TabMenuComponents/TabNavi';
import styled from 'styled-components';

const PostListWrapper = styled.div`
	margin-bottom: 20%;
`;

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
	const [posts, setPosts] = useState([]);
	const [limit] = useState(6); // 한 페이지당 보여줄 게시물 수
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	let token = useSelector((state) => state.auth.token);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			token = localStorage.getItem('authToken');
		}

		if (!isAuthenticated && !token) {
			navigate('/login');
		} else if (token) {
			const getPosts = async () => {
				setIsLoading(true); // 로딩 시작
				const offset = (page - 1) * limit;
				const fetchedPosts = await fetchFollowingFeed(token, limit, offset);

				// 불러온 게시물이 limit보다 적으면 더 이상 게시물이 없다고 판단
				if (fetchedPosts.length < limit) {
					setHasMore(false);
				} else {
					setHasMore(true);
				}

				// 각 게시물의 accountname을 사용하여 프로필 정보를 가져오기
				const postsWithProfiles = await Promise.all(
					fetchedPosts.map(async (post) => {
						const profile = await fetchProfile(token, post.author.accountname);
						return {
							...post,
							authorProfile: profile,
						};
					})
				);

				setPosts((prevPosts) => [...prevPosts, ...postsWithProfiles]);
				setIsLoading(false); // 로딩 끝
			};
			getPosts();
		}
	}, [isAuthenticated, token, navigate, limit, page]);

	const handlePostClick = (postId) => {
		navigate(`/post/${postId}`);
	};

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
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
		<PostListWrapper>
			<NavigationBar title={'핸드펫 피드'} />
			{posts.length > 0 ? (
				<>
					<MainFeed
						posts={posts}
						onPostClick={handlePostClick}
						onLike={handleLike}
						onUnLike={handleUnLike}
					/>
					{hasMore && (
						<Button size="more" onClick={loadMore} disabled={isLoading}>
							{isLoading ? '로딩 중...' : '더보기'}
						</Button>
					)}
				</>
			) : (
				<MainEmptyFeed />
			)}
			<TabNaviComponent />
		</PostListWrapper>
	);
};

export default PostListPage;