import React,{Fragment} from 'react';
import classes from './Header.Module.css';
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'
const Header = props=>{
    return (<Fragment>
        <header className={classes.header}>
            <h1>Cafe Jupiter</h1>
            <HeaderCartButton onClick={props.onClick}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="A table full with delicious items"/>
        </div>
    </Fragment>
    );
}

export default Header;
