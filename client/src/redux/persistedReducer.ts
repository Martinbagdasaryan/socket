import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { CombinedState, combineReducers, Reducer } from "redux";

import roomReducer from "./roomReducer";
import nameReducer from "./nameReducer";
import { IAction, IReducer } from "../types/interfaces";

const persistConfig = {
  key: "room and name",
  storage,
};

const rootReducer: Reducer<
  CombinedState<IReducer>,
  IAction<string>
> = combineReducers({
  room: roomReducer,
  name: nameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
