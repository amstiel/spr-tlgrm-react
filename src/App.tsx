import { useEffect } from 'react';
import { products } from './mock/products';
import { ProductsList } from './components/ProductsList/ProductsList';

import styles from './App.module.css';

function App() {
    useEffect(() => {
        Telegram.WebApp.ready();
    }, []);

    const handleOnClick = () => {
        Telegram.WebApp.BackButton.show();
    };

    return (
        <div className={styles.container}>
            <ProductsList products={products} />
            <button onClick={handleOnClick}>close</button>
        </div>
    );
}

export default App;
