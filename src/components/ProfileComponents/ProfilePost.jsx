import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import Button from '../SharedComponents/Button';
import postListBtnOn from '../../assets/icons/icon-post-list-on.svg';
import postListBtnOff from '../../assets/icons/icon-post-list-off.svg';
import postAlbumBtnOn from '../../assets/icons/icon-post-album-on.svg';
import postAlbumBtnOff from '../../assets/icons/icon-post-album-off.svg';

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
	text-align: center;

	&.album-post-view {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.post-album-item img {
		width: 234px;
		height: 234px;
		object-fit: cover;
	}
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

	const postsWithImages = posts.filter((post) => post.image);

	const handlePostClick = (postId) => {
		navigate(`/post/${postId}`);
	};

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
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
					{postView === 'list' ? (
						<PostList>
							{posts.map((post) => (
								<li
									key={post.id}
									className="post-list-item"
									onClick={() => handlePostClick(post.id)}
								>
									{post.image && <img src={post.image} alt="" />}
									<p>{post.content}</p>
								</li>
							))}
						</PostList>
					) : (
						<PostAlbum className="album-post-view">
							{postsWithImages.map((post) => (
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

					{hasMore && (
						<Button size="more" onClick={loadMore} disabled={isLoading}>
							{isLoading ? '로딩 중...' : '더보기'}
						</Button>
					)}
				</>
			) : (
				<EmptyState>등록된 게시물이 없습니다.</EmptyState>
			)}
		</PostContainer>
	);
};

export default PostTab;
