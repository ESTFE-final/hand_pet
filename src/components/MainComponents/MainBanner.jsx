import React, { useState } from 'react';
import styled from 'styled-components';
import BannerImg from '../../assets/images/img-main-banner.png';

const BannerContainer = styled.div`
	display: flex;
	margin: auto;
	position: relative;
	max-width: 468px;
	overflow: hidden;
	margin: 0 1.7rem;
`;

const SlideWrapper = styled.div`
	display: flex;
	transition: transform 0.5s ease-in-out;
	transform: ${({ currentSlide }) => `translateX(-${currentSlide * 100}%)`};
`;

const Banner = styled.img`
	width: 100%;
	border-radius: 8px;
	flex-shrink: 0;
`;

const SlideButton = styled.button`
	width: 68px;
	height: 24px;
	position: absolute;
	bottom: 8px;
	right: 8px;
	background-color: #000000b2;
	color: var(--white);
	padding: 6px 16px 5px;
	border-radius: 30px;
	border: none;
	font-size: 1.2rem;
	cursor: pointer;
`;

const MainBanner = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const totalSlides = 4;
	const images = [BannerImg, BannerImg, BannerImg, BannerImg];

	const handleNextSlide = () => {
		setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
	};

	return (
		<BannerContainer>
			<SlideWrapper currentSlide={currentSlide}>
				{images.map((img, index) => (
					<Banner key={index} src={img} alt={`Banner ${index + 1}`} />
				))}
			</SlideWrapper>
			<SlideButton onClick={handleNextSlide}>
				{currentSlide + 1} / {totalSlides}
			</SlideButton>
		</BannerContainer>
	);
};

export default MainBanner;
