import React, {useContext,useEffect,useState} from 'react';
import classes from './HeaderCartButton.Module.css'
import CartIcon from '../Cart/CartIcon'
import cartContext from '../../store/cart-context'
const HeaderCartButton=props=>{
    const [ButtonIsHighlighted,setButtonIsHighlighted] = useState(false);
    const cartCtx =useContext(cartContext);
    const {items }=cartCtx;
    const HighlightCartButton =  `${classes.button} ${ButtonIsHighlighted ? classes.bump:''}`;
    const numberOfCartItems =cartCtx.items.reduce((currentCount, item)=>{
            return currentCount+ item.amount;
    },0);

    useEffect(()=>{
        if(items.length===0){
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(()=>{
            setButtonIsHighlighted(false);
        },300
        );
        return()=>{
            clearTimeout(timer)
        };

    },[items]
    );

    
     return(
        <button className={HighlightCartButton} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;