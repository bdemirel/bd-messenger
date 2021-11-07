import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';
import Chat from 'modules/chat/Chat';
import classes from './App.module.scss';
import { fetchFriends } from './App.actions';

function App() {
  const friends = useSelector((state) => state.app.friends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div className={classes.app}>
      <div className={classes.content}>
        <Sidebar friends={friends} />
        <Chat />
      </div>
    </div>
  );
}

export default App;
