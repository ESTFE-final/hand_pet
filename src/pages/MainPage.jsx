import React from 'react';
import { NavigationBar } from '../components/SharedComponents/CommonComponents';
import MainBanner from '../components/MainComponents/MainBanner';
import MainCategory from '../components/MainComponents/MainCategory';
import MainProductList from '../components/MainComponents/MainProductList';
import TabNaviComponent from '../components/TabMenuComponents/TabNavi';

const MainPage = () => (
	<>
		<NavigationBar title={'핸드펫 홈'} />
		<MainBanner />
		<MainProductList />
		<TabNaviComponent />
	</>
);

export default MainPage;
