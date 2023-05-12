import { createStore, Store } from "redux";
import { Persistor, persistStore } from "redux-persist";
import persistedReducer from "./persistedReducer";

const store: Store = createStore(persistedReducer);
const persistor: Persistor = persistStore(store);

export { store, persistor };
