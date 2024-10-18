import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logoHandPet from '../assets/icons/logo-handpet.svg';

const SplashScreenWrapper = styled.div`
	background-color: #fff;
	width: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
`;

const Logo = styled.img`
	width: 374px;
	height: 388px;
	transition: opacity 0.5s ease-in-out;
	opacity: ${(props) => props.opacity};
`;

const SplashScreenPage = ({ onFinish }) => {
	const [logoOpacity, setLogoOpacity] = useState(1);

	useEffect(() => {
		const logoTimer = setTimeout(() => {
			setLogoOpacity(0);
		}, 1500);

		const finishTimer = setTimeout(() => {
			onFinish();
		}, 2000);

		return () => {
			clearTimeout(logoTimer);
			clearTimeout(finishTimer);
		};
	}, [onFinish]);

	return (
		<SplashScreenWrapper>
			<Logo src={logoHandPet} alt="HandPet Logo" opacity={logoOpacity} />
		</SplashScreenWrapper>
	);
};

export default SplashScreenPage;
