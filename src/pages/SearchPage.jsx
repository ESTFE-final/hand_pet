import React from 'react';
import MainSearch from '../components/MainComponents/MainSearch';
import { BodyContainer } from '../components/SharedComponents/CommonComponents';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import { Input } from '../components/SharedComponents/CommonComponents';
import styled from 'styled-components';

const SearchInput = styled(Input)``;
// Input 컴포넌트를 styled 로 만들면 여기서 커스텀 가능.

const SearchPage = () => (
	<>
		<NavigationBar rightButton={<SearchInput placeholder={'계정 검색'} />} />
		<MainSearch />
	</>
);

export default SearchPage;
