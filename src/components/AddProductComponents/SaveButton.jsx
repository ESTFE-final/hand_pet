import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	/* Layout */
	display: flex;
	position: static;
	align-items: center;
	justify-content: center;
	transform: translate(245px, -122px);

	/* Size */
	width: 122px;
	height: 54px;

	/* Spacing */
	gap: 0px;
	top: 64px;

	/* Appearance */
	background-color: #ff010a;
	border-radius: 20px 20px;
	border: 1px 0px 0px 0px;
	opacity: 0px;
	transform: translate(245px, -122px);
`;

const SaveButton = () => {
	return (
		<div>
			<StyledButton>
				<button>
					<div style={{ fontSize: '22px', color: 'white' }}>저장하기</div>
				</button>
			</StyledButton>
		</div>
	);
};

export default SaveButton;
