import styled from 'styled-components';
import React from 'react';
import PetFood from '../../assets/icons/icon-main-pet-food.svg';
import PetJerky from '../../assets/icons/icon-main-pet-jerky.svg';
import PetChew from '../../assets/icons/icon-main-pet-chew.svg';
import PetCookie from '../../assets/icons/icon-main-pet-cookie.svg';
import PetCake from '../../assets/icons/icon-main-pet-cake.svg';
import PetPowder from '../../assets/icons/icon-main-pet-powder.svg';
import Sale from '../../assets/icons/icon-main-sale.svg';

const CategoryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 20px;
	width: 631px;
	height: 308px;
	margin: 26px auto;
`;

const CategoryWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const IconContainer = styled.div`
	width: 100px;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f5f5f5;
	border-radius: 12px;
	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}
	cursor: pointer;
`;

const Icon = styled.img`
	width: 60px;
	height: 60px;
`;

const Label = styled.span`
	margin-top: 10px;
	font-size: 2rem;
	color: #333;
`;

const Divider = styled.div`
	height: 42px;
	background-color: #f5f5f5;
`;

const categories = [
	{ icon: PetFood, label: '수제사료' },
	{ icon: PetJerky, label: '육포·말이' },
	{ icon: PetChew, label: '천연수제껌' },
	{ icon: PetCookie, label: '쿠키' },
	{ icon: PetCake, label: '케이크' },
	{ icon: PetPowder, label: '파우더' },
	{ icon: Sale, label: '세일' },
];

const MainCategory = ({ setSelectedCategory }) => {
	return (
		<>
			<CategoryContainer>
				{categories.map((category) => (
					<CategoryWrapper key={category.label}>
						<IconContainer
							onClick={() => {
								console.log('Category Clicked:', category.label);
								setSelectedCategory(category.label);
							}}
						>
							<Icon src={category.icon} alt={category.label} />
						</IconContainer>
						<Label>{category.label}</Label>
					</CategoryWrapper>
				))}
			</CategoryContainer>
			<Divider />
		</>
	);
};

export default MainCategory;
