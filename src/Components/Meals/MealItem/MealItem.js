import React from 'react';
import { useContext } from 'react';
import CartContext from '../../../Store/CartContext';
import styles from './MealItem.module.css';
import MealItemForm from './MealitemForm';


const MealItem = (props) => {
    const ctx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        ctx.additem({"id": props.id, "name": props.name, "amount": amount, price :props.price})
    }

    return (
            <li className={styles.meal}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={styles.description}>{props.description}</div>
                    <div className={styles.price}>{price}</div>
                </div>
                <div>
                    <MealItemForm onAddToCart={addToCartHandler}/>
                </div>
            </li>
    )
}

export default MealItem;