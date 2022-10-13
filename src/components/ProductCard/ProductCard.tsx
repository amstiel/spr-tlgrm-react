import { FC } from 'react';

import styles from './ProductCard.module.css';

type ProductCardProps = {
    title: string;
    image: string;
    price: number;
    weight: number;
};

export const ProductCard: FC<ProductCardProps> = (props) => {
    const { image, weight, price, title } = props;

    return (
        <article>
            <img className={styles.image} src={image} alt={title} />
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.misc}>
                <span className={styles.price}>{price}&nbsp;₽</span> / <span>{weight} г</span>
            </p>
            <button className={styles.button}>Добавить</button>
        </article>
    );
};
