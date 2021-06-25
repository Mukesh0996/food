import React from 'react';

const CartContext = React.createContext({items:[], totalAmount:0, additem: () => {}, removeItem:() =>{}, clearCart: ()=> {} });


export default CartContext;