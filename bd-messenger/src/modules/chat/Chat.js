import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Button } from '@blueprintjs/core';
import _ from 'lodash';
import classNames from 'classnames';
import classes from './Chat.module.scss';
import { sendMessage } from './Chat.actions';

const Chat = () => {
	const dispatch = useDispatch();
	const chatID = useSelector((state) => state.app.openChatID);
	const chatInfo = useSelector((state) => state.app.friends?.find((ele) => ele.id === chatID));
	const chatHistory = useSelector((state) => state.chat?.[chatID]);
	const historyWindow = useRef();
	const [message, setMessage] = useState('');

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		if (!_.isEmpty(message)) {
			dispatch(sendMessage({
				chatID,
				message: {
					id: `${chatID}-${Date.now()}`,
					content: message,
					sent: true,
					time: new Date(),
				},
			}));
			setMessage('');
		}
	}, [chatID, dispatch, message]);

	useEffect(() => setMessage(''), [chatID]);

	useEffect(() => {
		historyWindow.current?.scrollTo({
			top: historyWindow.current.scrollHeight,
			left: 0,
			behavior: 'instant',
		});
	}, [chatHistory]);

	useEffect(() => {
		// NOTE Mocking received messages
		if (!_.isNil(chatID)) {
			const incomingMessageTimeout = setTimeout(() => {
				dispatch(sendMessage({
					chatID,
					message: {
						id: `${chatID}-${Date.now()}`,
						content: 'Hi!',
						sent: false,
						time: new Date(),
					},
				}));
			}, (Math.random() * 2000) + 2000);

			return () => clearTimeout(incomingMessageTimeout);
		}
		return undefined;
	}, [chatID, dispatch]);

	if (_.isNil(chatID)) {
		return null;
	}

	return (
		<div className={classes.container}>
			<div className={classes.banner}>
				{`Chat with ${chatInfo.name} `}
				{
					chatInfo.online
					&& (
						<span className={classes.online}>
							(Online)
						</span>
					)
				}
			</div>
			<div className={classes.chats} ref={historyWindow}>
				{
					chatHistory?.map((message) => {
						const messageClass = classNames({
							[classes.balloon]: true,
							[classes.sent]: message.sent,
						});

						return (
							<div className={classes.wrapper} key={message.id}>
								<div className={messageClass}>
									<div className={classes.content}>
										{message.content}
									</div>
									<div className={classes.time}>
										{message.time?.toLocaleString()}
									</div>
								</div>
							</div>
						);
					})
				}
			</div>
			<div className={classes.message}>
				<form onSubmit={handleSubmit}>
					<InputGroup
						className={classes.input}
						fill
						name="message"
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Write a message..."
						rightElement={<Button icon="send-message" minimal type="submit" />}
						value={message}
					/>
				</form>
			</div>
		</div>
	);
};

export default Chat;
