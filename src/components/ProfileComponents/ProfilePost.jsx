import React, { useState } from 'react';
import styled from 'styled-components';
import postListBtnOn from '../../icons/icon-post-list-on.svg';
import postListBtnOff from '../../icons/icon-post-list-off.svg';
import postAlbumBtnOn from '../../icons/icon-post-album-on.svg';
import postAlbumBtnOff from '../../icons/icon-post-album-off.svg';

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

	const posts = [
		{
			id: 1,
			content: '수제 케이크 제작 가능합니다.',
			image:
				'https://images.unsplash.com/photo-1726672936070-a9b65f47b7c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			id: 2,
			content: '이미지 없으면 ~? 앨범형에는 안뜬다!',
			image: '',
		},
		{
			id: 3,
			content:
				'강아지 케이크 클래스 이번주 예약 마감! 다음주부터 예약 가능합니다. 🎂🧁🍰👩🏻‍🍳',
			image:
				'https://images.unsplash.com/photo-1560398327-9fad15439ada?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
	];

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
