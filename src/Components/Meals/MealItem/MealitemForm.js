import React,{useRef, useState} from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submithandler = (event) => {
        event.preventDefault();
        const amountValue = amountInputRef.current.value;
        const amountValueNumber = +amountValue;
        if(amountValueNumber === 0 || amountValueNumber < 1 || amountValueNumber > 5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(amountValueNumber)
    }

    return (
        <form onSubmit={submithandler} className={styles.form} >
            <Input ref={amountInputRef} label="Amount" input={{id:"amount", type:"number", min:"1", max:"5", step:"1", defaultValue:"1"}}/>
            <button type="submit">+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
        </form>
    )

}

export default React.memo(MealItemForm);