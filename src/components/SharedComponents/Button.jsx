import styled, { css } from 'styled-components';

const SIZES = {
	xs: css`
		--button-font-size: 1.1rem;
		--button-max-width: 70px;
		--button-padding: 0.7rem 1.5rem 0.8rem;
		--button-radius: 2.6rem;
	`,
	sm: css`
		--button-max-width: 90px;
		--button-padding: 0.9rem 3.1rem 0.7rem;
		--button-radius: 3.2rem;
		--button-font-size: 1.1rem;
	`,
	md: css`
		--button-max-width: 120px;
		--button-padding: 1rem 4rem 0.8rem;
		--button-radius: 3rem;
	`,
	lg: css`
		--button-max-width: 322px;
		--button-padding: 1.3rem 14rem 1.5rem;
		--button-radius: 4.4rem;
	`,
	more: css`
		--button-font-size: 1.4rem;
		--button-max-width: 100%;
		--button-padding: 3rem 0;
		--button-radius: 0;
		--button-bg-color: var(--graylight-100);
		--button-color: var(--black);
		margin-top: 3rem;
	`,
};

const StyledButton = styled.button`
	${(p) => p.sizeStyle}

	display: ${(p) => (p.size === 'more' ? 'block' : 'inline-flex')};
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
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: var(--button-bg-color, #fff);
		border-color: var(--button-border-color, #dbdbdb);
		color: var(--button-color, #b4b4b4);
	}

	&:active {
		background: var(--button-bg-color, #fff);
		border-color: var(--button-border-color, #dbdbdb);
		color: var(--button-color, #b4b4b4);
	}

	&:disabled {
		cursor: default;
		opacity: 0.7;
		${(p) =>
			p.size === 'more' &&
			css`
				color: var(--button-color, var(--black));
				background: var(--button-bg-color, var(--graylight-100));
			`}
	}
`;

function Button({ disabled, size, children, onClick, className }) {
	const sizeStyle = SIZES[size];

	return (
		<StyledButton
			disabled={disabled}
			sizeStyle={sizeStyle}
			size={size}
			onClick={onClick}
			className={className}
		>
			{children}
		</StyledButton>
	);
}

export default Button;
