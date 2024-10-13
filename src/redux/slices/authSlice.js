import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload;
			localStorage.setItem('authToken', action.payload);
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			localStorage.removeItem('authToken');
		},
		loadAuthState: (state) => {
			const token = localStorage.getItem('authToken');
			if (token) {
				state.isAuthenticated = true;
				state.token = token;
			}
		},
	},
});

export const { login, logout, loadAuthState } = authSlice.actions;
export default authSlice.reducer;
