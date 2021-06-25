import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import CartContextProvider from './Store/CartProvider';

ReactDOM.render(<CartContextProvider> <App /> </CartContextProvider>, document.getElementById('root'));
