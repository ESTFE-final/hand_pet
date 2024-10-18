import React from 'react';
import FeedItem from './FeedItem'; // FeedItem 컴포넌트 import

const MainFeed = ({ posts, onPostClick }) => { // onPostClick props 추가
  return (
    <>
      {posts.map((post) => ( // posts 배열을 순회하며 FeedItem 렌더링
        <FeedItem 
          key={post.id} // ID를 키로 사용
          content={post.content} 
          postImgSrc={post.image} 
          onClick={() => onPostClick(post.id)} // 클릭 핸들러 추가
        />
      ))}
    </>
  );
};

export default MainFeed;
