import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FeedItem from '../components/MainComponents/FeedItem'; // FeedItem import

const PostDetailPage = () => {
  const { id } = useParams(); // URL 파라미터에서 id 추출
  const [post, setPost] = useState(null); // 게시물 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

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

  useEffect(() => {
    fetchPostDetails(id); // 컴포넌트 마운트 시 게시물 정보 가져오기
  }, [id]);

  if (loading) return <div>로딩 중...</div>; // 로딩 중 메시지
  if (error) return <div>{error}</div>; // 오류 메시지 표시

  return (
    <div>
      <FeedItem content={post.content} postImgSrc={post.image} postId={post.id} />
    </div>
  );
};

export default PostDetailPage;