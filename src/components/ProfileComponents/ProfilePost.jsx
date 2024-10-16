import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // axios 추가
import postListBtnOn from '../../assets/icons/icon-post-list-on.svg';
import postListBtnOff from '../../assets/icons/icon-post-list-off.svg';
import postAlbumBtnOn from '../../assets/icons/icon-post-album-on.svg';
import postAlbumBtnOff from '../../assets/icons/icon-post-album-off.svg';

const PostContainer = styled.section``;
const PostNav = styled.nav`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 32px;
	border-bottom: 1px solid var(--gray);
	padding: 0 36px;
`;
const PostButton = styled.button`
	padding-top: 16px;
	padding-bottom: 16px;
	&.list-btn {
		padding-right: 32px;
	}
	img {
		width: 40px;
		height: 40px;
	}
	&:hover {
		opacity: 0.8;
	}
`;
const EmptyState = styled.p`
	padding-top: 48px;
	text-align: center;
	font-size: 3.2rem;
`;
const PostList = styled.ul`
	.post-list-item {
		padding: 0 21px;
		img {
			width: 100%;
			height: 544px;
			object-fit: cover;
		}
		p {
			margin: 10px 0;
			font-size: 2.8rem;
		}
	}
`;
const PostAlbum = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 0 32px;
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

const API_URL = 'https://estapi.mandarin.weniv.co.kr';

const PostTab = ({ accountname }) => {
	const [postView, setPostView] = useState('list');
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	// 게시물 가져오기
	useEffect(() => {
		const fetchUserPosts = async () => {
			const token = localStorage.getItem('authToken');
			if (!token) return;

			try {
				const res = await axios.get(`${API_URL}/post/${accountname}/userpost`, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
				setPosts(res.data.post); // 가져온 게시물 데이터를 상태로 저장
				setLoading(false);
			} catch (error) {
				console.error('게시물 가져오기 실패:', error);
				setLoading(false);
			}
		};

		fetchUserPosts();
	}, [accountname]);

	const postsWithImages = posts.filter((post) => post.image);

	return (
		<PostContainer aria-label="게시물 목록">
			{loading ? (
				<p>로딩 중...</p>
			) : posts.length > 0 ? (
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
								<li key={post.id} className="post-list-item">
									{post.image && <img src={post.image} alt="" />}
									<p>{post.content}</p>
								</li>
							))}
						</PostList>
					) : (
						<PostAlbum className="album-post-view">
							{postsWithImages.map((post) => (
								<li key={post.id} className="post-album-item">
									<img src={post.image} alt="" />
								</li>
							))}
						</PostAlbum>
					)}
				</>
			) : (
				<EmptyState>등록된 게시물이 없습니다.</EmptyState>
			)}
		</PostContainer>
	);
};

export default PostTab;
