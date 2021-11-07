export const CHAT_ACTIONS = {
	SEND_MESSAGE: 'CHAT_SEND_MESSAGE',
};

export const sendMessage = (payload) => ({
	type: CHAT_ACTIONS.SEND_MESSAGE,
	payload,
});
