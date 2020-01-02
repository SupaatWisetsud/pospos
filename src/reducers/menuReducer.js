
export default (state = "shop", action) => {
    switch(action.type){
        case "choose" :
                state = action.payload;
            break;
        default :
            break;
    }
    return state;
}