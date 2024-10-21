import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LeftArrowIcon from '../../assets/icons/icon-arrow-left.svg';

const NavBar = styled.nav`
	top: 0;
	left: 0;
	width: 100%;
	height: 96px;
	padding: 0 32px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: var(--white);
	border-bottom: 2px solid var(--gray);
	box-sizing: border-box;
	margin-bottom: 32px;
`;

const NavLeftGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const NavTitle = styled.h1`
	margin-left: 20px;
	font-weight: normal;
	font-size: 3.6rem;
	margin-top: 4px;
`;

const CommonInput = styled.input`
	width: 100%;
	padding: 2.126rem 2rem;
	background-color: var(--graylight);
	border: 2px solid var(--graylight-100);
	border-radius: 88px;
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
	width: 504px;
	border-radius: 20px;
	border: none;
	padding: 0;
	margin: auto;
`;

const ModalWrap = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		padding: 48px 0;
	}
`;

const AlertButtonLeft = styled.button`
	width: 252px;
	background-color: transparent;
	padding: 30px 0;
	border-top: 1px solid var(--gray);
`;

const AlertButtonRight = styled.button`
	width: 252px;
	background-color: transparent;
	padding: 30px 0;
	border-top: 1px solid var(--gray);
	border-left: 1px solid var(--gray);
	color: var(--primary);
`;

const PostModalOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	transition: opacity 0.3s;
	z-index: 998;

	&.visible {
		display: block;
		opacity: 1;
	}

	&.hidden {
		display: none;
		opacity: 0;
	}
`;

const PostModalContainer = styled.aside`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: var(--white);
	border-radius: 20px 20px 0 0;
	transition: transform 0.3s;
	z-index: 999;

	&.visible {
		display: block;
		transform: translateY(0);
	}

	&.hidden {
		display: none;
		transform: translateY(100%);
	}
`;

const PostModalContent = styled.div`
	padding: 32px 0 48px 0;
	display: flex;
	flex-direction: column;
`;

const PostModalHandle = styled.button`
	width: 100px;
	height: 8px;
	background-color: var(--gray);
	border-radius: 10px;
	margin: 0 auto 24px;
`;

const PostModalOption = styled.button`
	width: 100%;
	text-align: left;
	padding: 30px 52px;
	font-size: 2.8rem;
`;

export const NavigationBar = ({
	title,
	rightButton,
	className,
	leftButton,
	searchInput,
}) => {
	const defaultLeftButton = (
		<button>
			<img
				src={LeftArrowIcon}
				alt="뒤로가기"
				style={{ width: '44px', height: '44px' }}
			/>
		</button>
	);

	return (
		<NavBar className={className}>
			<NavLeftGroup>
				{leftButton || defaultLeftButton}
				<NavTitle>{title}</NavTitle>
			</NavLeftGroup>
			{searchInput}
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
	buttonAction, // 버튼 액션을 props로 전달
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
							buttonAction(); // 버튼 액션 호출
							modalClose(); // 모달 닫기
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
