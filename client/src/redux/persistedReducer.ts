import { persistReducer } from "redux-persist";
import { CombinedState, combineReducers, Reducer } from "redux";
import storage from "redux-persist/lib/storage";
import roomReducer from "./storeUserRoom";
import nameReducer from "./storeUserName";
import { IAction, IReducer } from "../types/interfaces";

const persistConfig = {
  key: "room and name",
  storage,
};

const rootReducer :Reducer<CombinedState<IReducer>, IAction<string>> = combineReducers({
  room: roomReducer,
  name: nameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
