import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../Store/CartContext';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const ctx = useContext(CartContext);
    const { items } = ctx;
    const[btnIsHighLighted, setBtnIsHighlighted] = useState(false);
    const itemsCount =  items.reduce((curNumber, item) => {
        return curNumber + item.amount
    },0);
    
    const btnClass = `${styles.button} ${btnIsHighLighted ? styles.bump: ''}`

    useEffect(() => {
        if(items.length ===0){
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        },300)
        return () => {
            clearTimeout(timer);
        }
    },[items]);

    return(
        <button className={btnClass} onClick={props.show}> 
            <span className={styles.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={styles.badge}>{itemsCount}</span>
        </button>
    )
}

export default React.memo(HeaderCartButton);