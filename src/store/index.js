import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './reducers/loginReducer';
import mainReducer from './reducers/mainReducer';
import styleReducer from './reducers/styleReducer';

const persistConfig = {
  key: process.env.REACT_APP_NAME,
  storage,
  whitelist: ['login']
};

const rootReducer = combineReducers({
  login: loginReducer,
  style: styleReducer,
  main: mainReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(reduxThunk)
));

export const persistor = persistStore(store);

export default store;