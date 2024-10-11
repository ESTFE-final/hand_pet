import React from 'react';
import styled from 'styled-components';
import img from '../../icons/upload-file.svg';

const StyledButton = styled.button`
	/* Layout */
	display: flex;
	position: static;
	align-items: center;
	justify-content: center;
	transform: translate(255px, -155px);

	/* Size */
	/* Size */
	width: 322px;
	height: 204px;

	/* Spacing */
	gap: 0px;

	/* Position */
	top: 32px;

	/* Appearance */
	opacity: 0px;
	z-index: 200;
	transform: translate(255px, -35px);

	/* Appearance */
	gap: 0px;
	border-radius: 10px 0px 0px 0px;
	border: 0.5px 0px 0px 0px;
	opacity: 0px;

	/* Layering */
	z-index: 200;
`;

const FloatinButton = () => {
	return (
		<div>
			<StyledButton>
				<img src={img} width={75} alt="upload" />
			</StyledButton>
		</div>
	);
};

export default FloatinButton;
