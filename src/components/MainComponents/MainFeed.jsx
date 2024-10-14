import React from 'react';
import FeedItem from './FeedItem'; // FeedItem 컴포넌트 import
import PostImg1 from '../../assets/images/img-main-feed(1).png';
import PostImg2 from '../../assets/images/img-main-feed(2).png';

const MainFeed = () => {
	return (
		<>
			<FeedItem content="수제 케이크 예약 가능합니다!" postImgSrc={PostImg1} />
			<FeedItem
				content="강아지 케이크 예약 가능합니다!"
				postImgSrc={PostImg2}
			/>
		</>
	);
};

export default MainFeed;
