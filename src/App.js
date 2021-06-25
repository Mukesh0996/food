import React,{useContext, useState} from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartContext from "./Store/CartContext";


function App() {

  const [cartIsShown, setCartIsShown] = useState(false);
  const ctx = useContext(CartContext);
  console.log(ctx);

  const showCarthandler = () => {
    setCartIsShown(true);

  }
  const hideCarthandler = () =>{
    setCartIsShown(false);
  }
  return (
    <React.Fragment>
   { cartIsShown && <Cart hideCart={hideCarthandler}/>}
     <Header showCart={showCarthandler} />
      <main>
        <Meals/>
      </main>
    </React.Fragment>
  );
}

export default App;
