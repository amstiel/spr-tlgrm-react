import { useCallback, useEffect } from 'react';
import { useStore } from 'effector-react';

import { $cart, $cartTotalAmount, $cartTotalQuantity } from './stores/cart';
import { ProductsList } from './components/ProductsList/ProductsList';
import { products } from './mock/products';

import styles from './App.module.css';

const queryId = Telegram.WebApp.initDataUnsafe?.query_id;

function App() {
    const { items } = useStore($cart);
    const cartTotalQuantity = useStore($cartTotalQuantity);
    const cartTotalAmount = useStore($cartTotalAmount);
    const onSendData = useCallback(() => {
        const data = {
            products: items,
            totalPrice: cartTotalAmount,
            queryId,
        };
        Telegram.WebApp.MainButton.showProgress;
        fetch('https://worker-production-4214.up.railway.app:8094/order-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                Telegram.WebApp.close();
            })
            .finally(() => {
                Telegram.WebApp.MainButton.hideProgress();
            });
    }, [items]);

    useEffect(() => {
        Telegram.WebApp.ready();
    }, []);

    useEffect(() => {
        if (cartTotalQuantity > 0) {
            Telegram.WebApp.MainButton.setParams({
                text: `Заказать вкусностей на ${cartTotalAmount} руб.`,
                color: '#4e9f37',
            });
            Telegram.WebApp.MainButton.show();
        } else {
            Telegram.WebApp.MainButton.hide();
        }
    }, [cartTotalAmount, cartTotalQuantity]);

    useEffect(() => {
        Telegram.WebApp.onEvent('mainButtonClicked', onSendData);
        return () => {
            Telegram.WebApp.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);

    return (
        <div className={styles.container}>
            <ProductsList products={products} />
        </div>
    );
}

export default App;
