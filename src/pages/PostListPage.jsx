import React, { useEffect, useState } from 'react'; // React 
import axios from 'axios'; // axios 라이브러리 
import { useSelector } from 'react-redux'; // Redux 
import { useNavigate } from 'react-router-dom'; 
import MainEmptyFeed from '../components/MainComponents/MainEmptyFeed'; 
import { NavigationBar } from '../components/SharedComponents/CommonComponents'; 
import MainFeed from '../components/MainComponents/MainFeed'; 

// API 데이터를 가져오는 비동기 함수
const fetchPosts = async (token) => {
    try {
        // API 호출, Authorization 헤더에 토큰 추가
        const response = await axios.get('API_ENDPOINT', {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
        });
        return response.data.posts; // API 응답에서 게시물 목록 반환
    } catch (error) {
        console.error("Error fetching posts:", error); 
        return []; // 오류가 발생하면 빈 배열 반환
    }
};

const PostListPage = () => {
    const [posts, setPosts] = useState([]); // 게시물 상태를 관리하기 위한 상태 변수
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Redux에서 로그인 상태 가져오기
    let token = useSelector((state) => state.auth.token); // Redux에서 인증 토큰 가져오기
    const navigate = useNavigate(); // 페이지 리다이렉트를 위한 navigate 함수

    useEffect(() => {
        // 로컬 스토리지에서 토큰 가져오기
        if (!token) {
            token = localStorage.getItem('authToken'); // 토큰이 없으면 로컬 스토리지에서 가져옴
        }

        if (!isAuthenticated && !token) {
            // 인증되지 않았고, 로컬 스토리지에도 토큰이 없는 경우
            navigate('/login'); // 로그인 페이지로 리다이렉트
        } else if (token) {
            // 토큰이 있으면 게시물 가져오기
            const getPosts = async () => {
                const fetchedPosts = await fetchPosts(token); // fetchPosts 함수 호출하여 게시물 데이터 가져오기
                setPosts(fetchedPosts); // 가져온 게시물 데이터를 상태에 설정
            };
            getPosts(); // 게시물 가져오기 호출
        }
    }, [isAuthenticated, token, navigate]); 

    return (
        <>
            <NavigationBar title={'핸드펫 피드'} /> 
            {posts.length > 0 ? ( // 게시물이 있는지 확인
                <MainFeed posts={posts} /> // 게시물이 있을 경우 MainFeed 컴포넌트 렌더링
            ) : (
                <MainEmptyFeed /> // 게시물이 없을 경우 MainEmptyFeed 컴포넌트 렌더링
            )}
        </>
    );
};

export default PostListPage;
