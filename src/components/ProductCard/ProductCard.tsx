import {FC} from 'react';
import clsx from 'clsx';

import styles from './ProductCard.module.css';
import {$cart, addProduct, removeProduct} from '../../stores/cart';
import {useStore, useStoreMap} from 'effector-react';

type ProductCardProps = {
    id: number;
    title: string;
    image: string;
    price: number;
    weight: number;
};

export const ProductCard: FC<ProductCardProps> = (props) => {
    const {id, image, weight, price, title} = props;

    const cartItemForCurrentProduct = useStoreMap({
        store: $cart,
        keys: [id],
        fn: (state, [pId]) => state.items.find(({productId}) => pId === productId),
    });

    const isProductInCart = cartItemForCurrentProduct !== undefined && cartItemForCurrentProduct.quantity > 0;

    const handleAddButtonClick = () => {
        addProduct({
            productId: id,
            quantity: 1,
            pricePerItem: price,
        });
    };

    const onDeleteButtonClick = () => {
        removeProduct({
            productId: id,
            quantity: 1,
            pricePerItem: price
        })
    }

    return (
        <article className={styles.root}>
            <img className={styles.image} src={image} alt={title}/>
            <h4 className={styles.title}>{title}</h4>

            <div className={styles.priceAndButtonsWrapper}>
                <p className={styles.misc}>
                    <span className={styles.price}>{price}&nbsp;₽</span> / <span>{weight} г</span>
                </p>

                <div className={styles.buttonsWrapper}>
                    {isProductInCart ? <>
                        <button className={clsx(styles.button, styles.isCompact)} onClick={onDeleteButtonClick}>
                            -
                        </button>
                        <span className={styles.quantity}>{cartItemForCurrentProduct.quantity}</span>
                        <button className={clsx(styles.button, styles.isCompact)} onClick={handleAddButtonClick}>
                            +
                        </button>
                    </> : <>
                        <button className={styles.button} onClick={handleAddButtonClick}>
                            Добавить
                        </button>
                    </>}
                </div>
            </div>
        </article>
    );
};
