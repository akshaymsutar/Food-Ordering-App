import React, {useEffect,useState} from 'react';
import classes from './HeaderCartButton.Module.css'
import CartIcon from '../Cart/CartIcon'
import {useSelector} from 'react-redux'
const HeaderCartButton=props=>{
    const [ButtonIsHighlighted,setButtonIsHighlighted] = useState(false);
    const items =useSelector(state=>state.items);
    // const {items }=cartCtx;
    const HighlightCartButton =  `${classes.button} ${ButtonIsHighlighted ? classes.bump:''}`;
    const numberOfCartItems =items.items.reduce((currentCount, item)=>{
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