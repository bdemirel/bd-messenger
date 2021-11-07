import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducer from './RootReducer';

const composeEnhancers = composeWithDevTools({ trace: true });

class ReduxStore {
	store = createStore(
		RootReducer,
		composeEnhancers(applyMiddleware(thunk))
	);
}

export default new ReduxStore();