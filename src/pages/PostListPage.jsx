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
import { LoadingSpinner } from '../components/SharedComponents/CommonComponents';

const PostListWrapper = styled.div`
	margin-bottom: 20%;
`;

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
		return response.data.posts;
	} catch (error) {
		console.error('Error fetching following feed:', error);
		return [];
	}
};

const fetchProfile = async (token, accountname) => {
	try {
		const response = await axios.get(
			`https://estapi.mandarin.weniv.co.kr/profile/${accountname}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data.profile;
	} catch (error) {
		console.error('Error fetching profile:', error);
		return null;
	}
};

const PostListPage = () => {
	const [posts, setPosts] = useState([]);
	const [limit] = useState(6);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isInitialLoading, setIsInitialLoading] = useState(true);
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
				if (isLoading) return;

				setIsLoading(true);
				const offset = (page - 1) * limit;
				const fetchedPosts = await fetchFollowingFeed(token, limit, offset);

				if (fetchedPosts.length < limit) {
					setHasMore(false);
				}

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
				setIsLoading(false);
				setIsInitialLoading(false);
			};
			getPosts();
		}
	}, [isAuthenticated, token, navigate, limit, page, isLoading]);

	const handlePostClick = (postId) => {
		navigate(`/post/${postId}`);
	};

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
	};

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
				post.id === postId
					? { ...post, hearted: isLiked, heartCount: newHeartCount }
					: post
			)
		);
	};

	return (
		<PostListWrapper>
			<NavigationBar title={'핸드펫 피드'} />
			{isInitialLoading ? (
				<LoadingSpinner />
			) : posts.length > 0 ? (
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
