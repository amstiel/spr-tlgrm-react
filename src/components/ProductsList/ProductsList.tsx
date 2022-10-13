import { FC } from 'react';
import { Product } from '../../domains/product';
import { ProductCard } from '../ProductCard/ProductCard';

import styles from './ProductsList.module.css';

type ProductsListProps = {
    products: Product[];
};

export const ProductsList: FC<ProductsListProps> = (props) => {
    const { products } = props;

    return (
        <ul className={styles.list}>
            {products.map((product) => (
                <li key={product.id}>
                    <ProductCard
                        title={product.title}
                        image={product.image}
                        price={product.price}
                        weight={product.weight}
                    />
                </li>
            ))}
        </ul>
    );
};
