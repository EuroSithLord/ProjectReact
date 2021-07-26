import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());