import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PostContainer = styled.section``;

const ProfilePost = ({ accountname, token }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const limit = 10; // 한 번에 가져올 게시물 수
    const [skip, setSkip] = useState(0); // 페이징을 위한 스킵 값

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `https://estapi.mandarin.weniv.co.kr/post/${accountname}/userpost/?limit=${limit}&skip=${skip}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setPosts(response.data); // 응답 데이터를 상태에 설정
            } catch (err) {
                setError(err.message); // 오류 메시지 설정
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchPosts();
    }, [accountname, token, limit, skip]); // accountname, token이 변경될 때마다 실행

    if (loading) {
        return <p>로딩 중...</p>; // 로딩 중일 때 메시지 표시
    }

    if (error) {
        return <p>{error}</p>; // 오류 메시지 표시
    }

    return (
        <PostContainer aria-label="게시물 목록">
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <img src={post.image} alt="" />
                            <p>{post.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>등록된 게시물이 없습니다.</p>
            )}
        </PostContainer>
    );
};

export default ProfilePost;
