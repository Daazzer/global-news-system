import {
  createStore,
  combineReducers,
  compose
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './reducers/loginReducer';
import styleReducer from './reducers/styleReducer';

const persistConfig = {
  key: process.env.REACT_APP_NAME,
  storage,
  whitelist: ['login']
};

const rootReducer = combineReducers({
  login: loginReducer,
  style: styleReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers());

export const persistor = persistStore(store);

export default store;