import { IReduxName, NameState } from "../types/interfaces";

const nameState: NameState = {
  name: "",
};

const nameReducer: IReduxName = (state = nameState, action): NameState => {
  switch (action.type) {
    case "ADDNAME":
      console.log(action.payload, "userred");
      return { name: action.payload };
    default:
      return state;
  }
};
export default nameReducer;
