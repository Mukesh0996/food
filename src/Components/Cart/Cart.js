import React, { useContext, useState } from 'react';
import CartContext from '../../Store/CartContext';
import Modal from '../UI/Modal';
import styles from './Cart.module.css'
import CartItem from './CartItem';
import CheckOut from './CheckOut';

const Cart = ({hideCart}) => {

    const [showSheckOut, setShowCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    
    const  ctx = useContext(CartContext);
    const hasItems = ctx.items.length > 0;
    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

    //calculating items count for future handling of the form
    const itemsCount =  ctx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    },0);

    //  showing the checkout form
    const showCheckOutHandler = () => setShowCheckOut(true);

    //cart item remove function
    const cartItemRemove = (id) => {
        ctx.removeitem(id);
    
        //removing the checkouthandler when there are no cart items present
        if( itemsCount === 1 && showSheckOut === true ) {
            setShowCheckOut(false);
        }
    };    

    //cart item add function
    const cartItemAdd = (item) =>  {
        ctx.additem(item);
    }

    // adding the order to the backend
    const addOrder = async (orderObject) => {

       setIsSubmitting(true);

       await fetch("https://food-app-2e8a8-default-rtdb.firebaseio.com/orders.json",{
            method:"POST",
            "Content-Type":"application/json",
            body: JSON.stringify(orderObject)
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        ctx.clearCart();

    }

    //displaying cart items
    const cartItems = <ul className={styles["cart-items"]}>{ctx.items.map(((i) => <CartItem key={i.id} name={i.name} amount={i.amount} price={i.price} onAdd={() => cartItemAdd(i)} onRemove={()=> cartItemRemove(i.id)}/>))}</ul>;
    
    const modalActions = <div className={styles.actions}>
                        <button className={styles["button--alt"]} onClick={hideCart}>Close</button>
                        { hasItems && <button className={styles.button} onClick={showCheckOutHandler}>Order</button>}
                        </div>

    const cartModal = <React.Fragment>
                        { cartItems }
                        <div className={styles.total}>
                            <span>Total Amount:</span>
                            <span>{totalAmount}</span>
                        </div>
                        { showSheckOut &&  <CheckOut onSubmit={addOrder} closeCart={hideCart}/> }
                        { !showSheckOut && modalActions }
                     </React.Fragment>

    const submitting = <p>Order is being placed...</p>  
    const orderPlaced =  <React.Fragment> <p>Order has been successfully placed.. Thank you for the order..</p><div className={styles.actions}>
                <button className={styles["button--alt"]} onClick={hideCart}>Close</button></div> </React.Fragment>
    
    return (
        <Modal close={hideCart}>
            {!isSubmitting && !didSubmit && cartModal}
            {isSubmitting && submitting}
            {!isSubmitting && didSubmit && orderPlaced}

        </Modal>
    )
}

export default Cart;

