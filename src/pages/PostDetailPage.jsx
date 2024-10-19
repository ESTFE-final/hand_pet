import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FeedItem from '../components/MainComponents/FeedItem'; // FeedItem import
import styled from 'styled-components';
import FeedDetail from '../components/MainComponents/FeedDetail';
import CommentForm from '../components/MainComponents/CommentForm';

const PostDetailWrapper = styled.section`
	height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
`;

const CommentScroll = styled.div`
	flex: 1;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
`;

const CommentSection = styled.div`
	flex: 1;
	overflow-y: auto;
	border-top: 1px solid var(--gray);

	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

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
	const [comments, setComments] = useState([]);
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

	// 좋아요 데이터 가져오기
	const handleLike = async () => {
		const token = localStorage.getItem('authToken');
		try {
			const response = await axios.post(
				`https://estapi.mandarin.weniv.co.kr/post/${id}/heart`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			setPost(response.data.post);
		} catch (error) {
			console.error('좋아요 오류:', error);
		}
	};

	// 좋아요 취소
	const handleUnLike = async () => {
		const token = localStorage.getItem('authToken');
		try {
			const response = await axios.delete(
				`https://estapi.mandarin.weniv.co.kr/post/${id}/unheart`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			setPost(response.data.post);
		} catch (error) {
			console.error('좋아요 취소 오류:', error);
		}
	};

	// 댓글 작성
	const handleCommentSubmit = async (commentContent) => {
		const token = localStorage.getItem('authToken');
		try {
			const res = await axios.post(
				`https://estapi.mandarin.weniv.co.kr/post/${id}/comments`,
				{
					comment: {
						content: commentContent,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			console.log('댓글 작성 성공:', res.data);
			setComments((prevComments) => [res.data.comment, ...prevComments]);
		} catch (error) {
			console.error('댓글 제출 오류:', error);
			if (error.response && error.response.status === 404) {
				alert('존재하지 않는 게시글입니다.');
			}
		}
	};

	// 댓글 리스트
	const fetchComments = async (postId) => {
		const token = localStorage.getItem('authToken');
		try {
			const res = await axios.get(
				`https://estapi.mandarin.weniv.co.kr/post/${postId}/comments`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			setComments(res.data.comments || []);
		} catch (error) {
			console.error('댓글 가져오기 실패:', error);
			setComments([]);
		}
	};

	useEffect(() => {
		fetchPostDetails(id); // 컴포넌트 마운트 시 게시물 정보 가져오기
		fetchComments(id);
	}, [id]);

	if (loading) return <div>로딩 중...</div>; // 로딩 중 메시지
	if (error) return <div>{error}</div>; // 오류 메시지 표시

	return (
		<PostDetailWrapper>
			<MenuButton
				onClick={(e) => {
					e.stopPropagation(); // 클릭 이벤트 전파 방지
					const options = window.confirm('게시물 수정 또는 삭제하시겠습니까?');
					if (options) {
						handleEdit();
					} else {
						handleDelete();
					}
				}}
			>
				⋮ {/* 점 3개 */}
			</MenuButton>
			<CommentScroll>
				{post && (
					<FeedItem
						content={post.content}
						postImgSrc={post.image}
						author={post.author} // author prop 전달
						postId={post.id}
						hearted={post.hearted}
						heartCount={post.heartCount}
						onLike={handleLike}
						onUnlike={handleUnLike}
					/>
				)}
				<CommentSection>
					<FeedDetail comments={comments} />
				</CommentSection>
			</CommentScroll>
			<CommentForm onSubmit={handleCommentSubmit} />
		</PostDetailWrapper>
	);
};

export default PostDetailPage;
