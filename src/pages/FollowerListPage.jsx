import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/SharedComponents/Button';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';

// 선언부 구조분해 할당
function FollowerListPage() {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 로직 부분
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const accountname = localStorage.getItem('accountname');

        // 예외처리 필수
        const fetchFollowers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://estapi.mandarin.weniv.co.kr/profile/${accountname}/follower`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-type': 'application/json',
                        },
                    }
                );
                console.log(response.data);
                setFollowers(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();
    }, []);

    const toggleFollow = async (follower) => {
        const token = localStorage.getItem('authToken');
        const accountname = follower.accountname; // 팔로우/언팔로우할 유저의 accountname

        try {
            // 팔로우/언팔로우 상태에 따라 적절한 API 호출
            if (follower.isfollow) {
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
                setFollowers((prevFollowers) =>
                    prevFollowers.map((item) =>
                        item._id === follower._id ? { ...item, isfollow: false } : item
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
                setFollowers((prevFollowers) =>
                    prevFollowers.map((item) =>
                        item._id === follower._id ? { ...item, isfollow: true } : item
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
            <NavigationBar title="팔로워" />
            <InnerWMobileFull>
                <h1 className="sr-only">팔로워 리스트 페이지입니다</h1>
                <FollowerListContent>
                    {followers.length === 0 ? (
                        <div>팔로워가 없습니다.</div>
                    ) : (
                        followers.map((follower) => (
                            <FollowerListItem key={follower._id}>
                                <FollowerInfo>
                                    <FollowerImg
                                        src={follower.image || 'default_image_url'} // 기본 이미지 URL을 지정
                                        alt={follower.username}
                                    />
                                    <FollowerText>
                                        <FollowerShopName>{follower.username}</FollowerShopName>
                                        <FollowerShopDesc>{follower.intro}</FollowerShopDesc>
                                    </FollowerText>
                                </FollowerInfo>
                                <Button size="sm" type="button" onClick={() => toggleFollow(follower)}>
                                    {follower.isfollow ? '언팔로우' : '팔로우'}
                                </Button>
                            </FollowerListItem>
                        ))
                    )}
                </FollowerListContent>
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

const FollowerInfo = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1.6rem;
`;

const FollowerListContent = styled.ul`
    padding: 0 1.6rem;
`;

const FollowerListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    & + & {
        margin-top: 3.4rem;
    }
`;

const FollowerImg = styled.img`
    background: var(--gray);
    width: 72px;
    height: 72px;
    overflow: hidden;
    border-radius: 50%;
    flex-shrink: 0;
`;

const FollowerText = styled.div`
    padding-top: 0.7rem;
`;

const FollowerShopName = styled.p`
    font-size: 2rem;
    margin-bottom: 0.6rem;
`;

const FollowerShopDesc = styled.p`
    color: var(--gray-300);
    font-size: 1.8rem;
`;

export default FollowerListPage;
