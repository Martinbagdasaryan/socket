import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import persistedReducer from './persistedReducer';

const store = createStore(persistedReducer);
const persistor = persistStore(store); // создайте persistor для управления хранилищем

export { store, persistor };