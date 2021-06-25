import CartContext from './CartContext';
import { useReducer } from 'react';

const CartContextProvider = (props) => {

const defautCartState = { items:[], totalAmount:0  };

const cartReducer = (state, action) => {
    if(action.type === "ADD") {
        let updatedItems;
        let totalprice = state.totalAmount +  action.item.price;
        // console.log(totalprice);
        let existingItemIndex = state.items.findIndex(i => i.id === action.item.id )
        let existingItem = state.items[existingItemIndex];
        if(existingItem) {
            const updatedItem = {...existingItem};
            updatedItem.amount = existingItem.amount + 1;
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }  
                 
        return { items: updatedItems, totalAmount: totalprice }
    } 
    else if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(i=> i.id === action.id);
        let updatedItems;
        let existingItem = state.items[existingCartItemIndex];
        let updatedTotal = state.totalAmount - existingItem.price;
        if(existingItem.amount === 1 ) {
            updatedItems = state.items.filter(i=> i.id !== action.id);
        } else {
            let updatedItem = {...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } 
        return {
            items: updatedItems, 
            totalAmount: updatedTotal
        }
    }  
    else if(action.type ==="CLEAR") {
        return defautCartState;
    }

        return defautCartState;
  };

  const[cartState, dispatchCartAction] = useReducer(cartReducer,defautCartState);


    const addItemHandler = (food) => {
        dispatchCartAction({type:"ADD", item: food });
    }

    const removeItemHandler = (id) => {
        dispatchCartAction({type:"REMOVE", id: id})
    }

    const clearCartHandler = () => {
        dispatchCartAction({type:"CLEAR"})
    }
    

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        isLooggedIn: false,
        additem: addItemHandler,
        removeitem:removeItemHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartContextProvider;