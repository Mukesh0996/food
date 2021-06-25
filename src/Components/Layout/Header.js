import React,{Fragment} from 'react';
import styles from './Header.module.css';
import images from '../Assests/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
const Header = ({showCart})=> {


    return(
        <Fragment>
            <header className={styles.header}>
                <h1>React Meals</h1>
               <HeaderCartButton show={showCart}/>
            </header>
            <div className={styles["main-image"]}>
                <img src={images} alt="A table full of delicious food"/>
            </div>
        </Fragment>
    )


}

export default Header;