import { Product } from '../domains/product';

import productImage1 from '../assets/products/1.jpg';
import productImage2 from '../assets/products/2.jpg';
import productImage3 from '../assets/products/3.jpg';
import productImage4 from '../assets/products/4.jpg';
import productImage5 from '../assets/products/5.jpg';
import productImage6 from '../assets/products/6.jpg';
import productImage7 from '../assets/products/7.jpg';
import productImage8 from '../assets/products/8.jpg';
import productImage9 from '../assets/products/9.jpg';

export const products: Product[] = [
    {
        id: 1,
        image: productImage1,
        title: 'Хинкали жареные с телятиной',
        price: 380,
        weight: 368,
    },
    {
        id: 2,
        image: productImage2,
        title: 'Хинкали с телятиной',
        price: 360,
        weight: 368,
    },
    {
        id: 3,
        image: productImage3,
        title: 'Шашлык из свинины',
        price: 450,
        weight: 160,
    },
];
