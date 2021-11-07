import { APP_ACTIONS } from './App.actions';

const initialState = {};

const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case APP_ACTIONS.FETCH_FRIENDS:
			return {
				...state,
				friends: action.payload,
			};
		case APP_ACTIONS.OPEN_CHAT:
			return {
				...state,
				openChatID: action.payload,
			};
		default:
			return state;
	}
};

export default AppReducer;
