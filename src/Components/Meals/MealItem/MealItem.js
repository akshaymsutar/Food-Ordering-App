import classes from "./MealItem.Module.css";
import MealItemForm from './MealItemForm';
import { itemsActions } from '../../../store/index';
import {useDispatch} from 'react-redux';
const MealItem=(props)=>{
    const price =`₹${props.price.toFixed(2)}`;
    const dispatch =useDispatch();
    // const CartCtx=useContext(CartContext);
    // const addToCartHandler=amount=>{ 
    //     CartCtx.addItem({
    //         id:props.id,
    //         name:props.name,
    //         amount:amount,
    //         price:props.price
    //     })
    // }
    const addToCartHandler=amount=>{ 
        dispatch(itemsActions.addItem({
                     id:props.id,
                     name:props.name,
                     amount:amount,
                     price:props.price
                 }));
        
         }
    
return(
    <li  className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description }>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler}/>
        </div>
    </li>
);
}

export default MealItem;