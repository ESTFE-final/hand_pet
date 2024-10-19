import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux'; //redux dispatch사용
import Profile from '../components/ProfileComponents/Profile';
import UserContent from '../components/ProfileComponents/UserContent';
import {
    PostModal,
    AlertModal,
} from '../components/SharedComponents/CommonComponents';
import TabNaviComponent from '../components/TabMenuComponents/TabNavi';
import { logout } from '../redux/slices/authSlice';  //redux 액션

const PageWrapper = styled.div`
    position: relative;
`;

const API_URL = 'https://estapi.mandarin.weniv.co.kr';

const ProfilePage = () => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [postModalOptions, setPostModalOptions] = useState([]);
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const dispatch = useDispatch(); // redux관련
    const { accountname } = useParams();
    const isMyProfile = !accountname;

    useEffect(() => {
        fetchProfileData();
    }, [accountname]);

    // 프로필 데이터 가져오기
    const fetchProfileData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        try {
            let url;
            if (isMyProfile) {
                url = `${API_URL}/user/myinfo`;
            } else {
                url = `${API_URL}/profile/${accountname}`;
            }

            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            });
            setProfileData(isMyProfile ? res.data.user : res.data.profile);
        } catch (error) {
            console.error('프로필 가져오기 실패:', error);
            if (error.res && error.res.status === 404) {
                alert('해당 계정이 존재하지 않습니다.');
            }
        }
    };

    // 팔로우
    const followData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        if (isMyProfile) {
            alert('자기 자신을 팔로우 할 수 없습니다.');
            return;
        }

        try {
            const res = await axios.post(
                `${API_URL}/profile/${accountname}/follow`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                    },
                }
            );
            setProfileData(res.data.profile);
        } catch (error) {
            console.error('팔로우 실패:', error);
        }
    };

    // 언팔로우
    const unFollowData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        try {
            const res = await axios.delete(
                `${API_URL}/profile/${accountname}/unfollow`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                    },
                }
            );
            setProfileData(res.data.profile);
        } catch (error) {
            console.error('언팔로우 실패:', error);
        }
    };

    const openPostModal = (options) => {
        setPostModalOptions(options);
        setIsPostModalOpen(true);
    };

    const closePostModal = () => {
        setIsPostModalOpen(false);
    };

    const openAlertModal = () => {
        setIsAlertModalOpen(true);
    };

    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
    };

    const handleLogout = () => {
        closePostModal();
        openAlertModal();
    };

    const confirmLogout = () => {
        dispatch(logout()); // Redux의 logout 액션 호출
        localStorage.removeItem('authToken'); // 토큰 삭제
        localStorage.removeItem('accountname'); // accountname 삭제
        // navigate('/login'); //왜 안돼 ㅠㅠ
    };

    return (
        <PageWrapper>
            <Profile
                openModal={openPostModal}
                onLogout={handleLogout}
                profile={profileData}
                isMyProfile={isMyProfile}
                onFollow={followData}
                onUnFollow={unFollowData}
            />
            <UserContent accountname={accountname} />
            <PostModal
                isOpen={isPostModalOpen}
                onClose={closePostModal}
                options={postModalOptions}
            />
            <AlertModal
                modalShow={isAlertModalOpen}
                alertText="로그아웃하시겠습니까?"
                buttonText="로그아웃"
                modalClose={closeAlertModal}
                buttonAction={confirmLogout} 
            />
            <TabNaviComponent />
        </PageWrapper>
    );
};

export default ProfilePage;
