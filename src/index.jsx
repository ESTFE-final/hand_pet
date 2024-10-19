import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
//  72# 풀리퀘스트 변경사항 반영을 위한 주석추가
