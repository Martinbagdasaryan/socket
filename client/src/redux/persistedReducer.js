import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import roomReducer from './storeUserRoom';
import nameReducer from './storeUserName';

const persistConfig = {
  key: 'room and name',
  storage,
};

const rootReducer = combineReducers({
    room: roomReducer,
    name: nameReducer
  });
  

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer