import styled, { css } from 'styled-components';

const SIZES = {
	xs: css`
		--button-font-size: 1.1rem;
		--button-max-width: 140px;
		--button-padding: 0.7rem 1.5rem 0.8rem;
		--button-radius: 2.6rem;
	`,
	sm: css`
		--button-max-width: 180px;
		--button-padding: 0.9rem 3.1rem 0.7rem;
		--button-radius: 3.2rem;
	`,
	md: css`
		--button-max-width: 240px;
		--button-padding: 1rem 4rem 0.8rem;
		--button-radius: 3rem;
	`,
	lg: css`
		--button-max-width: 644px;
		--button-padding: 1.3rem 14rem 1.5rem;
		--button-radius: 4.4rem;
	`,
};

const StyledButton = styled.button`
	${(p) => p.sizeStyle}

	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-color: var(--button-border-color, transparent);
	border-width: 1px;
	border-style: solid;
	border-radius: var(--button-radius);
	font-size: var(--button-font-size, 1.4rem);
	background: var(--button-bg-color, #ff3239);
	color: var(--button-color, #fff);
	width: 100%;
	max-width: var(--button-max-width);
	padding: var(--button-padding);

	&:active {
		background: var(--button-bg-color, #fff);
		border-color: var(--button-border-color, #dbdbdb);
		color: var(--button-color, #b4b4b4);
	}

	&:disabled {
		cursor: default;
		background: var(--button-bg-color, #d1d1d1);
	}
`;

function Button({ disabled, size, children, onClick }) {
	const sizeStyle = SIZES[size];

	return (
		<StyledButton disabled={disabled} sizeStyle={sizeStyle} onClick={onClick}>
			{children}
		</StyledButton>
	);
}

export default Button;
