import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import {useContext} from 'react';
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
const Cart =(props) =>{
    const CartCtx=useContext(CartContext);
    const RemoveItemHandler=(id)=>{
        CartCtx.removeItem(id);
    }
    const AddItemHandler=(item)=>{
        
        CartCtx.addItem(item);
        console.log(item);
    }
    const cartItems= 
        <ul className={classes['cart-items']}>
        {
        CartCtx.items.map((item)=>
        <CartItem 
        key={item.id} 
        name={item.name} 
        price={item.price} 
        amount={item.amount} 
        onRemove={RemoveItemHandler.bind(null,item.id)} 
        onAdd={AddItemHandler.bind(null,item)}>            
        </CartItem>)}
         </ul>;
    const totalPrice = `₹${CartCtx.totalAmount.toFixed(2)}`;    
    const hasItems = CartCtx.items.length>0
    return(
        <Modal onClick={props.onClick}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClick}>Close</button>
                {hasItems && <button clssName={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;