import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import Button from '../SharedComponents/Button';
import postListBtnOn from '../../assets/icons/icon-post-list-on.svg';
import postListBtnOff from '../../assets/icons/icon-post-list-off.svg';
import postAlbumBtnOn from '../../assets/icons/icon-post-album-on.svg';
import postAlbumBtnOff from '../../assets/icons/icon-post-album-off.svg';
import FeedItemComponents from '../MainComponents/FeedItemCompoents';
import { LoadingSpinner } from '../SharedComponents/CommonComponents';

const PostContainer = styled.section``;

const PostNav = styled.nav`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 16px;
	border-bottom: 0.5px solid var(--gray);
	padding: 0 23px;
`;

const PostButton = styled.button`
	padding-top: 9px;
	padding-bottom: 9px;

	&.list-btn {
		padding-right: 16px;
	}

	img {
		width: 20px;
		height: 20px;
	}

	&:hover {
		opacity: 0.8;
	}
`;

const EmptyState = styled.p`
	padding-top: 26px;
	text-align: center;
	font-size: 1.6rem;
`;
const PostList = styled.ul`
	.post-list-item {
		width: 97%;
		padding: 16px;
		border: 1px solid #dbdbdb;
		border-radius: 8px;
		margin: 0 auto;
		margin-bottom: 24px;

		img {
			width: 100%;
			height: 280px;
			object-fit: cover;
			margin-bottom: 10px;
			border-radius: 10px;
		}

		p {
			margin: 10px 0;
			font-size: 1.4rem;
		}
	}
`;

const PostAlbum = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 0 16px;
	/* text-align: center; */

	&.album-post-view {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.post-album-item img {
		width: 152px;
		height: 152px;
		object-fit: cover;
		/* margin-bottom: 10px;
		border-radius: 10px; */
	}
`;
const SpinnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh; /* 화면 전체 높이 */
`;

const PostTab = () => {
	const [postView, setPostView] = useState('list');
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [limit] = useState(6); // 한 페이지당 보여줄 게시물 수
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const { accountname: paramAccountname } = useParams();
	const localAccountname = localStorage.getItem('accountname');
	const token = localStorage.getItem('authToken');
	const navigate = useNavigate();

	const accountname = paramAccountname || localAccountname;

	const fetchPosts = useCallback(async () => {
		if (isLoading || !hasMore) return;
		setIsLoading(true);
		try {
			const response = await Axios.get(
				`https://estapi.mandarin.weniv.co.kr/post/${accountname}/userpost?limit=${limit}&skip=${(page - 1) * limit}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				}
			);

			if (Array.isArray(response.data.post)) {
				const newPosts = response.data.post;

				setPosts((prevPosts) => {
					const uniquePosts = newPosts.filter(
						(newPost) =>
							!prevPosts.some((existingPost) => existingPost.id === newPost.id)
					);
					return [...prevPosts, ...uniquePosts];
				});

				if (newPosts.length < limit) {
					setHasMore(false);
				}
			} else {
				console.warn('Unexpected data structure:', response.data);
				setHasMore(false);
			}
		} catch (error) {
			console.error(
				'Error fetching posts:',
				error.response?.data || error.message
			);
			setHasMore(false);
		} finally {
			setIsLoading(false);
		}
	}, [accountname, token, page, limit]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const handlePostClick = (postId) => {
		navigate(`/post/${postId}`);
	};

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
	};
	// 좋아요
	const handleLike = async (postId) => {
		const token = localStorage.getItem('authToken');
		try {
			const response = await Axios.post(
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
	const handleUnlike = async (postId) => {
		const token = localStorage.getItem('authToken');
		try {
			const response = await Axios.delete(
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
		<PostContainer aria-label="게시물 목록">
			{posts.length > 0 ? (
				<>
					<PostNav>
						<PostButton
							type="button"
							className={`list-btn ${postView === 'list' ? 'active' : ''}`}
							onClick={() => setPostView('list')}
							aria-pressed={postView === 'list'}
						>
							<img
								src={postView === 'list' ? postListBtnOn : postListBtnOff}
								alt="목록으로 보기"
							/>
						</PostButton>
						<PostButton
							type="button"
							className={postView === 'album' ? 'active' : ''}
							onClick={() => setPostView('album')}
							aria-pressed={postView === 'album'}
						>
							<img
								src={postView === 'album' ? postAlbumBtnOn : postAlbumBtnOff}
								alt="앨범으로 보기"
							/>
						</PostButton>
					</PostNav>

					<PostAlbum>
						{postView === 'list' ? (
							<PostList>
								{posts.map((post) => (
									<FeedItemComponents
										key={post.id}
										content={post.content}
										postImgSrc={post.image}
										author={post.author}
										postId={post.id}
										onPostClick={handlePostClick}
										hearted={post.hearted}
										heartCount={post.heartCount}
										onLike={handleLike}
										onUnlike={handleUnlike}
										showNavRightButton={false}
										commentCount={post.commentCount}
									/>
								))}
							</PostList>
						) : (
							<PostAlbum className="album-post-view">
								{posts
									.filter((post) => post.image)
									.map((post) => (
										<li
											key={post.id}
											className="post-album-item"
											onClick={() => handlePostClick(post.id)}
										>
											<img src={post.image} alt="" />
										</li>
									))}
							</PostAlbum>
						)}
					</PostAlbum>

					{hasMore && (
						<Button size="more" onClick={loadMore} disabled={isLoading}>
							{isLoading ? '로딩 중...' : '더보기'}
						</Button>
					)}
				</>
			) : (
				<SpinnerContainer>
					<LoadingSpinner />
				</SpinnerContainer>
			)}
		</PostContainer>
	);
};

export default PostTab;
