import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import postListBtnOn from '../../assets/icons/icon-post-list-on.svg';
import postListBtnOff from '../../assets/icons/icon-post-list-off.svg';
import postAlbumBtnOn from '../../assets/icons/icon-post-album-on.svg';
import postAlbumBtnOff from '../../assets/icons/icon-post-album-off.svg';
import { useSelector } from 'react-redux'; // useSelector 가져오기
import axios from 'axios'; // axios 가져오기

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
	const [posts, setPosts] = useState([]); // 게시물 상태 추가
	const [loading, setLoading] = useState(true); // 로딩 상태 추가
	const [error, setError] = useState(null); // 오류 상태 추가

	const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
	const accountName = useSelector((state) => state.auth.accountName); // Redux에서 계정 이름 가져오기

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(`https://estapi.mandarin.weniv.co.kr/post/${accountName}/userpost`, {
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});
				setPosts(response.data); // 응답 데이터를 상태에 설정
			} catch (err) {
				setError(err.message); // 오류 메시지 설정
			} finally {
				setLoading(false); // 로딩 상태 종료
			}
		};

		fetchPosts();
	}, [token, accountName]); // token과 accountName이 변경될 때마다 실행

	if (loading) {
		return <p>로딩 중...</p>; // 로딩 중일 때 메시지 표시
	}

	if (error) {
		return <p>{error}</p>; // 오류 메시지 표시
	}

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
							{posts.filter(post => post.image).map((post) => (
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
