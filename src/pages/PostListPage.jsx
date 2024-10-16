import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainEmptyFeed from '../components/MainComponents/MainEmptyFeed';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import MainFeed from '../components/MainComponents/MainFeed';

// API 요청을 통해 게시물을 가져오는 함수
const fetchPosts = async (token, limit, skip) => {
    try {
        const response = await axios.get(`https://estapi.mandarin.weniv.co.kr/post/feed/?limit=${limit}&skip=${skip}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('API Response:', response);  // API 응답 확인
        return response.data.posts; // 게시물 목록 반환
    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; // 오류가 발생하면 빈 배열 반환
    }
};

const PostListPage = () => {
    const [posts, setPosts] = useState([]); // 게시물 상태
    const [limit] = useState(10); // 한 번에 가져올 게시물 수
    const [skip, setSkip] = useState(0); // 페이징을 위한 스킵 값
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // 인증 상태 확인
    let token = useSelector((state) => state.auth.token); // 인증 토큰
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            token = localStorage.getItem('authToken'); // 로컬 스토리지에서 토큰 가져오기
        }

        console.log('Token:', token);  // 토큰 확인
        console.log('Is Authenticated:', isAuthenticated);  // 인증 상태 확인

        if (!isAuthenticated && !token) {
            navigate('/login'); // 로그인 페이지로 이동
        } else if (token) {
            const getPosts = async () => {
                const fetchedPosts = await fetchPosts(token, limit, skip); // 게시물 가져오기
                console.log('Fetched Posts:', fetchedPosts);  // 가져온 게시물 확인
                setPosts(fetchedPosts); // 게시물 상태 업데이트
            };
            getPosts();
        }
    }, [isAuthenticated, token, navigate, limit, skip]); // skip, limit 값이 변경될 때마다 재요청

    const loadMorePosts = () => {
        setSkip(skip + limit); // 더 많은 게시물을 가져오기 위해 skip 값 증가
    };

    return (
        <>
            <NavigationBar title={'핸드펫 피드'} />
            {posts.length > 0 ? (
                <>
                    <MainFeed posts={posts} /> {/* MainFeed에 posts 전달 */}
                    <button onClick={loadMorePosts}>더 보기</button> {/* 더 보기 버튼 */}
                </>
            ) : (
                <MainEmptyFeed />
            )}
        </>
    );
};

export default PostListPage;
