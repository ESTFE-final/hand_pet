import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavigationBar, Input } from '../components/SharedComponents/CommonComponents';
import DefaultImage from '../assets/icons/profile-img.svg'; 

// ImageBox component
function ImageBox({ src, type, size, alt }) {
    return (
        <ImageWrapper className={`${type} ${size}`}>
            <img src={src || DefaultImage} alt={alt} onError={(e) => e.target.src = DefaultImage} />
        </ImageWrapper>
    );
}

// SearchPage component
const SearchPage = () => {
    const [searchUser, setSearchUser] = useState([]);
    const [keyword, setKeyword] = useState('');

    // 로컬 스토리지에서 토큰을 가져옴
    const token = localStorage.getItem('authToken');

    // 검색 기능 구현
    const handleInputText = useCallback(async (event) => {
        const keyword = event.target.value;
        setKeyword(keyword);

        if (!keyword) {
            setSearchUser([]);
            return;
        }

        try {
            const response = await axios.get(
                `https://estapi.mandarin.weniv.co.kr/user/searchuser/?keyword=${keyword}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // 로컬 스토리지에서 가져온 token 사용
                        'Content-type': 'application/json'
                    }
                }
            );
            setSearchUser(response.data);
        } catch (error) {
            console.error('유저 검색 실패:', error);
        }
    }, [token]);

    // 검색된 유저 이름에 검색 키워드를 강조 표시
    const highlightKeyword = (text) => {
        if (text.includes(keyword)) {
            const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
            return parts.map(
                (part, index) => part.toLowerCase() === keyword.toLowerCase()
                    ? (<span
                        key={index}
                        style={{
                            color: '#FF3239'
                        }}>{part}</span>)
                    : (part)
            );
        }
        return text;
    };

    return (
        <PageWrapper>
            <NavigationBar searchInput={
                <Input
                    type="text"
                    placeholder="계정 검색"
                    onChange={handleInputText}
                />
            } />
            <UserList>
                {
                    searchUser.length > 0
                        ? (searchUser.map((user) => (
                            <UserItem key={user._id}>
                                <Link
                                    to={`/profile/${user.accountname}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                    <ImageBox type="circle" size="large" src={user.image} alt={user.accountname} />
                                    <UserInfo>
                                        <UserName>{highlightKeyword(user.username)}</UserName>
                                        <UserAccount>@ {highlightKeyword(user.accountname)}</UserAccount>
                                    </UserInfo>
                                </Link>
                            </UserItem>
                        )))
                        : (<NoSearchResult>검색 결과가 없습니다.</NoSearchResult>)
                }
            </UserList>
        </PageWrapper>
    );
};

// Styled components
const PageWrapper = styled.div`
    padding: 2rem;
`;

const UserList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const UserItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 3.2rem;
`;

const UserInfo = styled.div`
    margin-left: 2.4rem;
`;

const UserName = styled.p`
	font-size: 2.8rem;
`
const UserAccount = styled.span`
	display: block;
	font-size: 2.4rem;
	color: #b4b4b4;
`
const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 0.5px solid var(--gray);
    overflow: hidden;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &.circle {
        border-radius: 50%;

        &.medium {
            width: 50px;
            height: 50px;
        }
		&.large {
			width: 100px;
			height: 100px;
		}
    }
`;

const NoSearchResult = styled.p`
	padding-top: 4.8rem;
    text-align: center;
    font-size: 3.2rem;
`

export default SearchPage;
