import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import uploadIcon from '../assets/icons/upload-file.svg';

const PostUploadWrapper = styled.section`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const CustomNavigationBar = styled(NavigationBar)`
	border: none;
	margin-bottom: 64px;
`;

const UploadButton = styled.button`
	background-color: var(--gray-100);
	color: var(--white);
	padding: 15px 50px;
	border-radius: 64px;
	font-size: 2.8rem;
`;

const PostUploadContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const PostTextDiv = styled.div`
	width: calc(100% - 64px);
	margin: 0 32px;
	min-height: 150px;
	font-size: 2.8rem;
	border: none;
	outline: none;
	overflow: auto;

	&:empty:before {
		content: attr(data-placeholder);
		color: var(--gray-200);
	}
`;

const UploadFileContainer = styled.div`
	position: absolute;
	bottom: 32px;
	right: 32px;
`;

const UploadFileLabel = styled.label`
	display: block;
	background: url(${uploadIcon}) no-repeat center;
	width: 100px;
	height: 100px;
	background-size: 100%;
	cursor: pointer;
`;

const UploadFileInput = styled.input`
	display: none;
`;

const PostUploadPage = () => {
	const [content, setContent] = useState('');

	const handleInput = (e) => {
		setContent(e.target.innerText);
	};

	return (
		<PostUploadWrapper>
			<CustomNavigationBar
				title={'게시글 올리기'}
				rightButton={<UploadButton>업로드</UploadButton>}
			/>
			<PostUploadContainer>
				<PostTextDiv
					contentEditable
					onInput={handleInput}
					data-placeholder="게시글을 입력하세요.."
				/>
				<UploadFileContainer>
					<UploadFileLabel htmlFor="uploadimg" />
					<UploadFileInput type="file" id="uploadimg" accept="image/*" />
				</UploadFileContainer>
			</PostUploadContainer>
		</PostUploadWrapper>
	);
};

export default PostUploadPage;
