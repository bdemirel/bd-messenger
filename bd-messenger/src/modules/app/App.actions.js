import { friendsList } from './App.mock';

export const APP_ACTIONS = {
	FETCH_FRIENDS: 'APP_FETCH_FRIENDS',
	OPEN_CHAT: 'APP_OPEN_CHAT',
};

const fetchFriendsSuccess = (payload) => ({
	type: APP_ACTIONS.FETCH_FRIENDS,
	payload,
});

export const fetchFriends = () => (dispatch) => dispatch(fetchFriendsSuccess(friendsList));

export const openChat = (chatID) => ({
	type: APP_ACTIONS.OPEN_CHAT,
	payload: chatID,
});
