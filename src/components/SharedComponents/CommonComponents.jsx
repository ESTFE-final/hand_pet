import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '../../assets/icons/icon-arrow-left.svg';
import SearchIconPath from '../../assets/icons/icon-search.svg'; // Search Icon 경로 추가

const NavBar = styled.nav`
	/* position: fixed; */
	top: 0;
	width: 100%;
	max-width: 480px;
	padding: 13px 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: var(--white);
	border-bottom: 1px solid var(--gray);
	box-sizing: border-box;
	z-index: 998;
	/* margin-bottom: 16px; */
`;


const NavLeftGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const NavTitle = styled.h1`
	margin-left: 10px;
	font-weight: normal;
	font-size: 2rem;
	margin-top: 2px;
`;

const CommonInput = styled.input`
	width: 100%;
	padding: 1.7rem 2.5rem;
	background-color: var(--graylight);
	border: 1px solid var(--graylight-100);
	border-radius: 44px;
	outline: none;

	&::placeholder {
		color: var(--gray);
	}

	&:focus {
		background-color: var(--white);
		border-color: var(--primary);
	}
`;

const AlertModalContainer = styled.dialog`
	width: 252px;
	border-radius: 10px;
	border: none;
	padding: 0;
	margin: auto;
`;


const ModalWrap = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		padding: 24px 0;
	}
`;

const AlertButtonLeft = styled.button`
	width: 126px;
	background-color: transparent;
	padding: 15px 0;
	border-top: 0.5px solid var(--gray);
	font-size: 1.4rem;
`;

const AlertButtonRight = styled.button`
	width: 126px;
	background-color: transparent;
	padding: 15px 0;
	border-top: 0.5px solid var(--gray);
	border-left: 0.5px solid var(--gray);
	color: var(--primary);
	font-size: 1.4rem;
`;

const PostModalOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
	visibility: hidden;
	transition:
		opacity 0.3s,
		visibility 0.3s;
	z-index: 998;

	&.visible {
		opacity: 1;
		visibility: visible;
	}
`;

const PostModalContainer = styled.aside`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	max-width: 480px;
	margin: 0 auto;
	background-color: var(--white);
	border-radius: 10px 10px 0 0;
	opacity: 0;
	transform: translateY(100%);
	transition:
		opacity 0.3s,
		transform 0.3s;
	z-index: 1000;

	&.visible {
		opacity: 1;
		transform: translateY(0);
	}
`;

const PostModalContent = styled.div`
	margin: 16px 0 10px 0;
	display: flex;
	flex-direction: column;
`;

const PostModalHandle = styled.button`
	width: 100px;
	height: 4px;
	background-color: var(--gray);
	border-radius: 10px;
	margin: 0 auto 12px;
`;

const PostModalOption = styled.button`
	width: 100%;
	text-align: left;
	padding: 15px 26px;
	font-size: 1.4rem;
`;

const SearchIcon = styled.img`
	width: 24px;
	height: 24px;
	cursor: pointer;
	display: ${({ visible }) => (visible ? 'block' : 'none')};
	filter: invert(35%) sepia(0%) saturate(0%) hue-rotate(0deg);

  &:hover {
	filter: invert(0%) sepia(100%) saturate(1000%) hue-rotate(-50deg);
  }
`;

export const NavigationBar = ({
	title,
	rightButton = null,
	className = '',
	leftButton = null,
	searchInput,
	searchIconVisible = false,
}) => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			navigate('/login', { replace: true });
		}
	}, [navigate]);

	const defaultLeftButton = (
		<button onClick={() => navigate(-1)}>
			<img
				src={LeftArrowIcon}
				alt="뒤로가기"
				style={{ width: '22px', height: '22px' }}
			/>
		</button>
	);
	
	const handleSearchClick = () => {
		navigate('/search'); // 검색 페이지의 경로로 변경
	};
	return (
		<NavBar className={className}>
			<NavLeftGroup>
				{leftButton || defaultLeftButton}
				<NavTitle>{title}</NavTitle>
			</NavLeftGroup>
			{searchInput}
			<SearchIcon src={SearchIconPath} alt="검색" style={{ display: searchIconVisible ? 'block' : 'none' }} onClick={handleSearchClick} />
			{rightButton}
		</NavBar>
	);
};

export const Input = styled(
	({ className, type, placeholder, value, onChange }) => {
		return (
			<CommonInput
				className={className}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		);
	}
)``;

export const AlertModal = ({
	modalShow,
	alertText,
	modalClose,
	buttonText,
	buttonAction,
}) => {
	const dialogRef = useRef();

	useEffect(() => {
		if (modalShow) {
			dialogRef.current.showModal();
		} else {
			dialogRef.current.close();
		}
	}, [modalShow]);

	return (
		<AlertModalContainer ref={dialogRef}>
			<ModalWrap method="dialog">
				<p>{alertText}</p>
				<div>
					<AlertButtonLeft type="button" onClick={modalClose}>
						취소
					</AlertButtonLeft>
					<AlertButtonRight
						type="button"
						onClick={() => {
							buttonAction();
							modalClose();
						}}
					>
						{buttonText}
					</AlertButtonRight>
				</div>
			</ModalWrap>
		</AlertModalContainer>
	);
};

export const PostModal = ({ isOpen, onClose, options = [] }) => {
	const [isVisible, setIsVisible] = useState(isOpen);
	const [isDragging, setIsDragging] = useState(false);
	const [startY, setStartY] = useState(0);

	useEffect(() => {
		setIsVisible(isOpen);
	}, [isOpen]);

	const handleClose = () => {
		setIsVisible(false);
		onClose();
	};

	const handleOptionClick = (option) => {
		if (option.onClick) {
			option.onClick();
		}
		handleClose();
	};

	const handleStart = (clientY) => {
		setIsDragging(true);
		setStartY(clientY);
	};

	const handleMove = (clientY) => {
		if (!isDragging) return;
		const deltaY = clientY - startY;
		if (deltaY > 50) {
			handleClose();
			setIsDragging(false);
		}
	};

	const handleEnd = () => {
		setIsDragging(false);
	};

	const handleTouchStart = (e) => handleStart(e.touches[0].clientY);
	const handleTouchMove = (e) => handleMove(e.touches[0].clientY);
	const handleTouchEnd = handleEnd;

	const handleMouseDown = (e) => handleStart(e.clientY);
	const handleMouseMove = (e) => handleMove(e.clientY);
	const handleMouseUp = handleEnd;

	return (
		<>
			<PostModalOverlay
				className={isVisible ? 'visible' : 'hidden'}
				onClick={handleClose}
			/>
			<PostModalContainer
				className={isVisible ? 'visible' : 'hidden'}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			>
				<PostModalContent role="dialog" aria-modal="true">
					<PostModalHandle
						type="button"
						onClick={handleClose}
						aria-label="닫기"
					/>
					<ul>
						{options.map((option, index) => (
							<li key={index}>
								<PostModalOption
									type="button"
									onClick={() => handleOptionClick(option)}
								>
									{option.text}
								</PostModalOption>
							</li>
						))}
					</ul>
				</PostModalContent>
			</PostModalContainer>
		</>
	);
};
