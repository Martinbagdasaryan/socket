import { IReduxRoom, RoomState } from "../types/interfaces";

const roomState: RoomState = {
  room: "",
};

const roomReducer: IReduxRoom = (state = roomState, action): RoomState => {
  switch (action.type) {
    case "ADDROOM":
      return { room: action.payload };
    default:
      return state;
  }
};
export default roomReducer;
