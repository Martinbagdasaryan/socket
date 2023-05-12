const roomState={
    room:''
}

const roomReducer = (state=roomState , action) =>{
    switch(action.type){
        case "ADDROOM":
            return{room:action.payload}
        default:
            return state
    }
}
export default roomReducer