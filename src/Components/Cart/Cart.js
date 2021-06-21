import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem'
import {useDispatch,useSelector} from 'react-redux';
import { itemsActions } from '../../store/index';
import React, { useState } from 'react';
import Checkout from './Checkout';
import axios from 'axios';
const Cart =(props) =>{
    const items =useSelector(state=>state.items.items);
    const totalAmount = useSelector(state=>state.items.totalAmount);
    const [cartCheckout, setCartCheckout]=useState(false);
    const [isFormSubmitting, setIsFormSubmitting]=useState(false);
    const [doneSubmit, setDoneSubmit]=useState(false)
    const dispatch =useDispatch();
    const RemoveItemHandler=(id)=>{
        dispatch(itemsActions.removeItem(id));
    }
    const AddItemHandler=(item)=>{
        dispatch(itemsActions.addItem({
            id:item.id,
            name:item.name,
            amount:1,
            price:item.price
        }));
    }

    const onOrderClickHandler=()=>{
        setCartCheckout(true);
    }
    
    const onSubmitHandler= async (userData)=>{
        setIsFormSubmitting(true);
        const response= await axios.post('https://food-ordering-app-1b0f9-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        JSON.stringify({
            user:userData,
            orederItems:items,
            totalAmount
        }));
        if(!response.status===200){
            throw new Error('Something Went Wrong');
          } 
          
        const responseData = await response.data;
        setIsFormSubmitting(false);
        setDoneSubmit(true);

        dispatch(itemsActions.clearCart());
        //items.map((item)=>RemoveItemHandler(item.id))
    }
    const cartItems= 
        <ul className={classes['cart-items']}>
        {
        items.map((item)=>
        <CartItem 
        key={item.id} 
        name={item.name} 
        price={item.price} 
        amount={item.amount} 
        onRemove={RemoveItemHandler.bind(null,item.id)} 
        onAdd={AddItemHandler.bind(null,item)}>            
        </CartItem>)}
         </ul>;
    const totalPrice = `₹${totalAmount.toFixed(2)}`;    
    const hasItems = items.length>0;

    const ClickOptions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClick}>Close</button>
    {hasItems && <button className={classes.button} onClick={onOrderClickHandler}>Order</button>}
    </div>

    const modalContentBeforeSubmit = <React.Fragment>
        {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
            </div>
            
            {cartCheckout && <Checkout onConfirm={onSubmitHandler} onCancel={props.onClick}/>}
            {!cartCheckout && ClickOptions}
    </React.Fragment>

 const modalContentAfterSubmit = <React.Fragment>
     <p>Order Submitted Successfully</p>
     <div className={classes.actions}>
     <button onClick={props.onClick}>Close</button>
     </div>
     </React.Fragment>
 const modalContentWhileSubmitting = <p>Sending Order</p>

// const cartContent = doneSubmit ? modalContentAfterSubmit:modalContentBeforeSubmit;

    return(
        <Modal onClick={props.onClick}>
            {!isFormSubmitting && !doneSubmit && modalContentBeforeSubmit}
            {isFormSubmitting && modalContentWhileSubmitting}
            {!isFormSubmitting && doneSubmit && modalContentAfterSubmit}
        </Modal>
    );
}

export default Cart;