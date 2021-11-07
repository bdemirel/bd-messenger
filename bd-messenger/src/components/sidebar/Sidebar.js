import { useDispatch, useSelector } from 'react-redux';
import { Colors as BPColors, Icon } from '@blueprintjs/core';
import classNames from 'classnames';
import { openChat } from 'modules/app/App.actions';
import classes from './Sidebar.module.scss';

const Sidebar = ({ friends }) => {
	const dispatch = useDispatch();
	const activeChat = useSelector((state) => state.app.openChatID);

	return (
		<div className={classes.sidebar}>
			<div className={classes.title}>
				Friends List:
			</div>
			<div className={classes.friends}>
				{
					!friends
						? 'Loading...'
						: friends.map((friend) => {
							const buttonClass = classNames({
								[classes.friend]: true,
								[classes.active]: friend.id === activeChat,
							});
							const avatarClass = classNames({
								[classes.avatar]: true,
								[classes.online]: friend.online,
							});

							return (
								<button
									className={buttonClass}
									key={friend.id}
									onClick={() => dispatch(openChat(friend.id))}
								>
									{
										friend.avatar
											? (
												<img
													className={avatarClass}
													src={friend.avatar}
													alt={`${friend.name}'s Avatar`}
													title={`${friend.name}'s Avatar`}
												/>
											)
											: <Icon color={BPColors.WHITE} className={avatarClass} icon="person" size={20} />
									}
									<div className={classes.details}>
										<div className={classes.name} title={friend.name}>
											{friend.name}
										</div>
										<div className={classes.status} title={friend.status}>
											{friend.status}
										</div>
									</div>
								</button>
							)
						})
				}
			</div>
		</div>
	);
};

export default Sidebar;
