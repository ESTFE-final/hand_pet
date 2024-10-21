import React from 'react';
import FeedItem from './FeedItem'; // FeedItem 컴포넌트 import


const MainFeed = ({ posts, onPostClick, onLike, onUnLike }) => {
	return (
		<>
			{posts.map((post) => (
				<FeedItem
					key={post.id} // ID를 키로 사용
					content={post.content}
					postImgSrc={post.image}
					author={post.authorProfile || {}} // authorProfile이 없으면 빈 객체 전달
					onClick={() => onPostClick(post.id)} // 클릭 핸들러 추가
					hearted={post.hearted}
					heartCount={post.heartCount}
					onLike={() => onLike(post.id)}
					onUnlike={() => onUnLike(post.id)}
					showNavRightButton={false}
					commentCount={post.commentCount}
				/>
			))}
		</>
	);
};

export default MainFeed;
