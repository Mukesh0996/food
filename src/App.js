import React,{useState} from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";


function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

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
