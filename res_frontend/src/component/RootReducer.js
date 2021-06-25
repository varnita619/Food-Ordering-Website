

const initialState={
    cart:{},
    client:{},
    restaurant:{},
    
}

export default function RootReducer(state=initialState,action){
 switch(action.type)
 {
    case "ADD_CLIENT":
        state.client[action.payload[0]]=action.payload[1]       
        return {cart:state.cart,client:state.client,restaurant:state.restaurant}

   case "ADD_ITEM":
       state.cart[action.payload[0]]=action.payload[1]
       console.log(state.cart)
       return {cart:state.cart,client:state.client,restaurant:state.restaurant}

   case "REMOVE_ITEM":
        delete state.cart[action.payload]
        console.log(state.cart)
        return {cart:state.cart,client:state.client,restaurant:state.restaurant}
       
    case "ADD_RES":
        state.restaurant[action.payload[0]]=action.payload[1] 
           
            return {cart:state.cart,client:state.client,restaurant:state.restaurant}    
        
   default:
       return state    
 }

}