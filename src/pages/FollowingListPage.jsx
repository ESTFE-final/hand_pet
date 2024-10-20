import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';

// 선언부 구조분해 할당
function FollowingListPage() {
    const [followings, setFollowings] = useState([]); // 변수명 수정
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 로직 부분
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const accountname = localStorage.getItem('accountname');

        // 예외처리 필수
        const fetchFollowings = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://estapi.mandarin.weniv.co.kr/profile/${accountname}/following`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-type': 'application/json',
                        },
                    }
                );
                console.log(response.data);
                setFollowings(response.data); // 변수명 수정
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowings();
    }, []);

    const toggleFollow = async (following) => { // 변수명 수정
        const token = localStorage.getItem('authToken');
        const accountname = following.accountname; // 팔로우/언팔로우할 유저의 accountname

        try {
            // 팔로우/언팔로우 상태에 따라 적절한 API 호출
            if (following.isfollow) {
                // 언팔로우
                await axios.delete(
                    `https://estapi.mandarin.weniv.co.kr/profile/${accountname}/unfollow`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-type': 'application/json',
                        },
                    }
                );
                setFollowings((prevFollowings) => // 변수명 수정
                    prevFollowings.map((item) =>
                        item._id === following._id ? { ...item, isfollow: false } : item
                    )
                );
            } else {
                // 팔로우
                await axios.post(
                    `https://estapi.mandarin.weniv.co.kr/profile/${accountname}/follow`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-type': 'application/json',
                        },
                    }
                );
                setFollowings((prevFollowings) => // 변수명 수정
                    prevFollowings.map((item) =>
                        item._id === following._id ? { ...item, isfollow: true } : item
                    )
                );
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || '팔로우/언팔로우 처리 중 오류가 발생했습니다.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // 렌더링 부분
    return (
        <>
            <NavigationBar title="팔로잉" />
            <InnerWMobileFull>
                <h1 className="sr-only">팔로잉 리스트 페이지입니다</h1>
                <FollowingListContent>
                    {followings.length === 0 ? ( // 변수명 수정
                        <div>팔로잉이 없습니다.</div>
                    ) : (
                        followings.map((following) => ( // 변수명 수정
                            <FollowingListItem key={following._id}>
                                <FollowingInfo>
                                    <FollowingImg
                                        src={following.image || 'default_image_url'} // 기본 이미지 URL을 지정
                                        alt={following.username}
                                    />
                                    <FollowingText>
                                        <FollowingShopName>{following.username}</FollowingShopName>
                                        <FollowingShopDesc>{following.intro}</FollowingShopDesc>
                                    </FollowingText>
                                </FollowingInfo>
                                <Button size="sm" type="button" onClick={() => toggleFollow(following)}>
                                    {following.isfollow ? '언팔로우' : '팔로우'} {/* 변수명 수정 */}
                                </Button>
                            </FollowingListItem>
                        ))
                    )}
                </FollowingListContent>
            </InnerWMobileFull>
        </>
    );
}

const InnerWMobileFull = styled.div`
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding-bottom: 10rem;
`;

const FollowingInfo = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.6rem;
`;

const FollowingListContent = styled.ul`
    padding: 0 1.6rem;
`;

const FollowingListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    & + & {
        margin-top: 3.4rem;
    }
`;

const FollowingImg = styled.img`
    background: var(--gray);
    width: 72px;
    height: 72px;
    overflow: hidden;
    border-radius: 50%;
    flex-shrink: 0;
`;

const FollowingText = styled.div`
    padding-top: 0.7rem;
`;

const FollowingShopName = styled.p`
    font-size: 2rem;
    margin-bottom: 0.6rem;
`;

const FollowingShopDesc = styled.p`
    color: var(--gray-300);
    font-size: 1.8rem;
`;

export default FollowingListPage;
