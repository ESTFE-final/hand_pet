import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: './public/index.html', // public 폴더의 index.html을 엔트리로 설정
		},
	},
});
