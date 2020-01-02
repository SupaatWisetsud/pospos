
export default (state = [], action) => {
    switch(action.type){
        case "addProduct" :
                let checkadd = false;
                
                let x = [].concat(state);

                x.forEach(n => {
                    if(n.p_id === action.payload.p_id){
                        checkadd = true;
                    }
                });

                if(checkadd){
                    for(const n of x){
                        if(n.p_id ===  action.payload.p_id){
                            let i = Number.parseInt(n.count);
                            i += 1;
                            n.count = i;
                        }
                    }
                }else{
                    let obj = Object.assign(action.payload, {count : 1});
                    x.push(obj);
                }
                state = x;
            break;
        case "selectCount":
                let s = [].concat(state);
                s.forEach(n=>{
                    if(n.p_id === action.payload.id){
                        if(n.p_count >= action.payload.count){
                            n.count = action.payload.count;
                        }else{
                            n.count = n.p_count;
                        }
                    }
                });
                state = s;
            break; 
        case "deleteProduct" : 
                state = state.filter( n => n.p_id !== action.payload);
            break;
        case "deleteAll" :
                state = action.payload;
            break;
        default : 
            break;  
    }
    return state;
}