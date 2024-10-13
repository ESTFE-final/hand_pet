import React from 'react';
import MainSearch from '../components/MainComponents/MainSearch';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import { Input } from '../components/SharedComponents/CommonComponents';
import styled from 'styled-components';

const SearchInput = styled(Input)`
	width: 600px;
`;

const CustomNavigationBar = styled(NavigationBar)`
	background-color: lightblue;
`;

const SearchPage = () => (
	<>
		<CustomNavigationBar
			rightButton={<SearchInput placeholder={'계정 검색'} />}
		/>
		<MainSearch />
	</>
);

export default SearchPage;
