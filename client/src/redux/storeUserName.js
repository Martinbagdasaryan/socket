const nameState = {
  name: "",
};

const nameReducer = (state = nameState, action) => {
  switch (action.type) {
    case "ADDNAME":
      return { name: action.payload };
    default:
      return state;
  }
};
export default nameReducer;
