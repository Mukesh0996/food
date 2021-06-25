import { useContext, useRef, useState } from 'react';
import CartContext from '../../Store/CartContext';
import styles from './checkOut.module.css';

//helper functions for form validation
const isEmpty = (value) => value.trim() === "";
const isLengthEnough = (value) => value.trim().length < 5;

const CheckOut = (props) => {

    const {items} = useContext(CartContext);
    
    //refs referring to the input tags in the form
    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    })

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPostalCode = postalCodeRef.current.value;
        const enteredCity =  cityRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalCodeIsValid = !isEmpty(enteredPostalCode);
        const enteredCityIsValid = !isLengthEnough(enteredCity);
        
        setFormValidity (prevState => {
            return {...prevState, name: nameIsValid, street: streetIsValid, postalCode: postalCodeIsValid, city: enteredCityIsValid}
        });
        const isFromValid =   nameIsValid && streetIsValid && postalCodeIsValid && enteredCityIsValid
        if(!isFromValid) {
            return
        }

        props.onSubmit({
            address: {
            name: enteredName, 
            street: enteredStreet, 
            postalCode: enteredPostalCode, 
            city: enteredCity 
        },  items: items
        });
    }

    return (
        <form className={styles.form}>
            <div className={`${styles.control} ${!formValidity.name ? styles.invalid:""}`}>
                <label htmlFor="name">Name:</label>
                <input id="name" type="text" name="name" ref={nameRef}/>
                {!formValidity.name && <span className={styles.err}>Name is invalid</span>}
            </div>  
            <div className={`${styles.control} ${!formValidity.street ? styles.invalid:""}`}>
                <label htmlFor="street">Street:</label>
                <input id="street" type="text" name="street" ref={streetRef}/>
                {!formValidity.street && <span className={styles.err}>Street is invalid</span>}
            </div>  
            <div className={`${styles.control} ${!formValidity.postalCode ? styles.invalid:""}`}>
                <label htmlFor="postalcode">Postal Code:</label>
                <input id="postalcode" type="text" name="postalcode" ref={postalCodeRef}/>
                {!formValidity.postalCode && <span className={styles.err}>Postal code is invalid</span>}
            </div>  
            <div className={`${styles.control} ${!formValidity.city ? styles.invalid:""}`}>
                <label htmlFor="city">City:</label>
                <input id="city" type="text" name="city" ref={cityRef}/>
                {!formValidity.city && <span className={styles.err}>City is invalid</span>}
            </div> 
            <div className={styles.actions}>
            <button className={styles.submit} type="button" onClick={props.closeCart}>Cancel</button>
            <button className={styles.submit} type="submit" onClick={confirmHandler}>Confirm Order</button>
            </div> 
        </form>
    )
}

export default CheckOut;