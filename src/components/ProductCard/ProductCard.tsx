import { FC } from 'react';

import styles from './ProductCard.module.css';
import { $cart, addProduct } from '../../stores/cart';
import { useStoreMap } from 'effector-react';

type ProductCardProps = {
    id: number;
    title: string;
    image: string;
    price: number;
    weight: number;
};

export const ProductCard: FC<ProductCardProps> = (props) => {
    const { id, image, weight, price, title } = props;

    const cartItemForCurrentProduct = useStoreMap({
        store: $cart,
        keys: [id],
        fn: (state, [pId]) => state.items.find(({ productId }) => pId === productId),
    });

    const isProductInCart = cartItemForCurrentProduct !== undefined;

    const handleAddButtonClick = () => {
        addProduct({
            productId: id,
            quantity: 1,
            pricePerItem: price,
        });
    };

    return (
        <article>
            <img className={styles.image} src={image} alt={title} />
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.misc}>
                <span className={styles.price}>{price}&nbsp;₽</span> / <span>{weight} г</span>
            </p>
            {isProductInCart && (
                <button className={styles.button} onClick={handleAddButtonClick}>
                    -
                </button>
            )}
            {isProductInCart && cartItemForCurrentProduct.quantity}
            <button className={styles.button} onClick={handleAddButtonClick}>
                {isProductInCart ? '+' : 'Добавить'}
            </button>
        </article>
    );
};
