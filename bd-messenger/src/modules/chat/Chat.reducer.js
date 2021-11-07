import { CHAT_ACTIONS } from './Chat.actions';

const initialState = {};

const ChatReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHAT_ACTIONS.SEND_MESSAGE:
			return {
				...state,
				[action.payload.chatID]: [
					...(state[action.payload.chatID] ?? []),
					action.payload.message,
				],
			};
		default:
			return state;
	}
};

export default ChatReducer;
