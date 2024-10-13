import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import FeedItem from '../components/MainComponents/FeedItem';
import FeedDetail from '../components/MainComponents/FeedDetail';
const PostDetailPage = () => (
	<>
		<FeedItem />
		<FeedDetail />
	</>
);

export default PostDetailPage;
