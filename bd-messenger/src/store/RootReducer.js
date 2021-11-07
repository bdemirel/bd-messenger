import AppReducer from 'modules/app/App.reducer';
import ChatReducer from 'modules/chat/Chat.reducer';
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
	app: AppReducer,
	chat: ChatReducer,
});

export default RootReducer;
