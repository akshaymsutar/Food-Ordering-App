import classes from './Checkout.module.css';
import react ,{useRef,useState} from 'react';
import {useSelector} from 'react-redux';
import store from '../../store/index'
const isEmpty=(value)=> value.trim()==='';
const isFiveChars=(value)=>value.length===6;

const Checkout=(props)=>{
    const items =useSelector((state)=>state.items);
    const inputNameRef=useRef();
    const inputStreetRef=useRef();
    const inputPostalRef=useRef();
    const inputCityRef=useRef();
    const [formInputValidity,setFormInputValidity] =useState({
        name:true,
        street:true,
        city:true,
        postal:true
    });

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredName=inputNameRef.current.value;
        const enteredStreet=inputStreetRef.current.value;
        const enteredPostal=inputPostalRef.current.value;
        const enteredCity=inputCityRef.current.value;

        const isNameValid=!isEmpty(enteredName);
        const isStreetValid=!isEmpty(enteredStreet);
        const isCityValid=!isEmpty(enteredCity);
        const isPostalValid=isFiveChars(enteredPostal);

        setFormInputValidity({
            name:isNameValid,
            street:isStreetValid,
            city:isCityValid,
            postal:isPostalValid,
        });
        const isFormInputValid = isNameValid && isStreetValid && isCityValid && isPostalValid;

        if(!isFormInputValid){
            return
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postal:enteredPostal
        });
    }

    const controlClassName= `${classes.control} ${formInputValidity.name ? '':classes.invalid}`;
    const controlClassStreet= `${classes.control} ${formInputValidity.street ? '':classes.invalid}`;
    const controlClassCity= `${classes.control} ${formInputValidity.city ? '':classes.invalid}`;
    const controlClassPostal= `${classes.control} ${formInputValidity.postal ? '':classes.invalid}`;
    return(
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={controlClassName}>
                <label>Your Name</label>
                <input type='text' ref={inputNameRef} name='name'></input>
                {!formInputValidity.name && <p>Enter valid name</p>}
            </div>
            <div className={controlClassStreet}>
                <label>Street Name</label>
                <input type='text' ref={inputStreetRef} name='street'></input>
                {!formInputValidity.street && <p>Enter valid street</p>}
            </div>
            <div className={controlClassPostal}>
                <label>Postal Code</label>
                <input type='text'  ref={inputPostalRef} name='postalCode'></input>
                {!formInputValidity.postal && <p>Enter valid postal code</p>}
            </div>
            <div className={controlClassCity}>
                <label>Your City</label>
                <input type='text'  ref={inputCityRef} name='city'></input>
                {!formInputValidity.city && <p>Enter valid city</p>}
            </div>
            <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit} >Confirm</button>
            </div>
        </form>
    );
}

function priceCheck(products=[], productPrices=[], productSold=[], soldPrice=[]) {
    // Write your code here
    let ErrorCount=0;
    let count =0 ;
    productSold.forEach((item)=>{
        var ind = products.findIndexOf(item);
        var actualPrice =  productPrices[ind];
        var soldprice = soldPrice[count];
        if(actualPrice!=soldprice){
            ErrorCount = ErrorCount+1;
        }
        count ++;
    })

}

export default Checkout;