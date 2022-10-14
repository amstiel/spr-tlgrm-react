import { useEffect } from 'react';
import { products } from './mock/products';
import { ProductsList } from './components/ProductsList/ProductsList';

import styles from './App.module.css';
import { $cart, $cartTotalAmount, $cartTotalQuantity } from './stores/cart';
import { useStore } from 'effector-react';

function App() {
    const { items } = useStore($cart);
    const cartTotalQuantity = useStore($cartTotalQuantity);
    const cartTotalAmount = useStore($cartTotalAmount);

    const handleOnClick = () => {
        Telegram.WebApp.BackButton.show();
    };

    useEffect(() => {
        Telegram.WebApp.ready();
    }, []);

    useEffect(() => {
        if (cartTotalQuantity > 0) {
            Telegram.WebApp.MainButton.setParams({
                text: `Заказать вкусностей на ${cartTotalAmount} руб.`,
                color: '#4e9f37'
            });
            Telegram.WebApp.MainButton.show();
        } else {
            Telegram.WebApp.MainButton.hide();
        }
    }, [cartTotalAmount, cartTotalQuantity]);

    return (
        <div className={styles.container}>
            <ProductsList products={products} />
        </div>
    );
}

export default App;
