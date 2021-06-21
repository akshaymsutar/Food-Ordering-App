import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    items:[],
    totalAmount:0
}
const itemsComp = createSlice({
    name:'item',
    initialState,
    reducers:{
        addItem(state,action){
            const updatedTotalAmount = state.totalAmount+action.payload.price*action.payload.amount;
            // console.log(state.items);
            const existingItemIndex=state.items.findIndex(
                item=>item.id===action.payload.id
            );
            
            const existingCartItem=state.items[existingItemIndex];           
            
            let updatedItems;
            if(existingCartItem){
               const updatedItem={
                   ...existingCartItem,
                   amount:existingCartItem.amount+action.payload.amount
               }
              
               updatedItems=[...state.items];
               updatedItems[existingItemIndex]=updatedItem;
               
            }
            else{
                updatedItems=state.items.concat(action.payload);
                
            }
            // console.log(updatedItems);
            // console.log(updatedTotalAmount);
            state.items=updatedItems;
            state.totalAmount=updatedTotalAmount;
            
        },
        removeItem(state,action){
            const existingItemIndex=state.items.findIndex(
                item=>item.id===action.payload
            );
            const existingCartItem=state.items[existingItemIndex];
            const updatedTotalAmount =state.totalAmount-existingCartItem.price;
            let updatedItems;
            if(existingCartItem){
                if(existingCartItem.amount>1){
                    const updatedItem={
                        ...existingCartItem,
                        amount:existingCartItem.amount-1
                    }
                    updatedItems=[...state.items];
                    updatedItems[existingItemIndex]=updatedItem;
                }
               else{
                updatedItems=state.items.filter(item=>item.id!==action.payload);
               }
            }
                state.items=updatedItems;
                state.totalAmount=updatedTotalAmount;
            
        },
        clearCart(state){
            state.items=[];
            state.totalAmount=0;
        }
        
    }
})

export default itemsComp;