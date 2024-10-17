import React from 'react';
import FeedItem from './FeedItem'; // FeedItem 컴포넌트 import

const MainFeed = ({ posts }) => { // posts props 추가
    return (
        <>
            {posts.map((post, index) => ( // posts 배열을 순회하며 FeedItem 렌더링
                <FeedItem key={index} content={post.content} postImgSrc={post.image} /> // 이미지 속성은 실제 데이터에 따라 수정
            ))}
        </>
    );
};

export default MainFeed;
