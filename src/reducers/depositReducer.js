let id = 0;

export default (state = [], action) => {

    switch(action.type){
        case "depositOrder" :

            let x = [].concat(state);
            x.push(Object.assign(action.payload, {id}));
            state = x;
            id++;

            break;
        case "delDepositOrder" :

            state = state.filter( n => n.id !== action.payload.id);
            
            break;
        default : 
            break;  
    }
    return state;
}