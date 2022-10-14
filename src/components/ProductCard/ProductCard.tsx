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
            title: title,
            productId: id,
            quantity: 1,
            pricePerItem: price,
        });
    };

    const onDeleteButtonClick = () => {
        removeProduct({
            title: title,
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
                        <button className={clsx(styles.button, styles.isCompact, styles.isRemove)} onClick={onDeleteButtonClick}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.333 7.333h9.334a.667.667 0 110 1.334H3.333a.667.667 0 010-1.334z"></path></svg>
                        </button>
                        <span className={styles.quantity}>{cartItemForCurrentProduct.quantity}</span>
                        <button className={clsx(styles.button, styles.isCompact)} onClick={handleAddButtonClick}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 2.667c.368 0 .667.298.667.666v4h4a.667.667 0 110 1.334h-4v4a.667.667 0 11-1.334 0v-4h-4a.667.667 0 010-1.334h4v-4c0-.368.299-.666.667-.666z"></path></svg>
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
