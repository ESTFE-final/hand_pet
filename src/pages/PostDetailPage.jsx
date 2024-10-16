import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FeedItem from '../components/MainComponents/FeedItem'; // FeedItem import
import styled from 'styled-components';

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 16px;
  font-size: 24px; /* 점 3개 버튼 크기 조정 */
  color: #555; /* 버튼 색상 */
`;

const PostDetailPage = () => {
  const { id } = useParams(); // URL 파라미터에서 id 추출
  const [post, setPost] = useState(null); // 게시물 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 게시물 상세 정보를 가져오는 함수
  const fetchPostDetails = async (postId) => {
    const token = localStorage.getItem('authToken'); // 로컬 스토리지에서 토큰 가져오기
    try {
      const response = await axios.get(
        `https://estapi.mandarin.weniv.co.kr/post/${postId}`, // 게시물 상세 정보 API
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Fetched Post:', response.data); // 가져온 게시물 확인
      setPost(response.data.post); // 게시물 상태 업데이트
    } catch (err) {
      console.error('Error fetching post details:', err);
      setError('게시물 정보를 가져오는 데 실패했습니다.'); // 오류 메시지 설정
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${id}`); // 게시물 수정 페이지로 이동
  };

  const handleDelete = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      const token = localStorage.getItem('authToken'); // 로컬 스토리지에서 토큰 가져오기
      try {
        await axios.delete(`https://estapi.mandarin.weniv.co.kr/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        alert('게시글이 삭제되었습니다.');
        navigate(`/profile/${post.author.accountname}`); // 삭제 후 프로필 페이지로 이동
      } catch (error) {
        console.error('게시글 삭제 오류:', error);
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    fetchPostDetails(id); // 컴포넌트 마운트 시 게시물 정보 가져오기
  }, [id]);

  if (loading) return <div>로딩 중...</div>; // 로딩 중 메시지
  if (error) return <div>{error}</div>; // 오류 메시지 표시

  return (
    <div>
      <MenuButton onClick={(e) => {
        e.stopPropagation(); // 클릭 이벤트 전파 방지
        const options = window.confirm('게시물 수정 또는 삭제하시겠습니까?');
        if (options) {
          handleEdit();
        } else {
          handleDelete();
        }
      }}>
        ⋮ {/* 점 3개 */}
      </MenuButton>
      {post && (
        <FeedItem 
          content={post.content} 
          postImgSrc={post.image} 
          author={post.author} // author prop 전달
          postId={post.id} 
        />
      )}
    </div>
  );
};

export default PostDetailPage;
