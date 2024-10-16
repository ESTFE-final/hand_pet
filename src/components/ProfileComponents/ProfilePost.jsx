import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
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

const PostTab = () => {
	const [postView, setPostView] = useState('list');
	const [posts, setPosts] = useState([]);
	const accountname = localStorage.getItem('accountname');
	const token = localStorage.getItem('authToken');

	useEffect(() => {
		const fetchPosts = async () => {
			console.log('Token:', token);
			console.log('Account Name:', accountname);

			try {
				const response = await Axios.get(`https://estapi.mandarin.weniv.co.kr/post/${accountname}/userpost`, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});

				console.log('Response Data:', response.data); // 응답 데이터 확인

				// 응답 데이터 구조 확인 및 게시물 배열 설정
				if (Array.isArray(response.data.post)) {
					setPosts(response.data.post); // post 키 아래의 배열로 설정
				} else {
					console.warn('Unexpected data structure:', response.data);
				}
			} catch (error) {
				console.error('Error fetching posts:', error.response?.data || error.message);
			}
		};

		fetchPosts();
	}, [accountname, token]);

	const postsWithImages = posts.filter((post) => post.image);

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
