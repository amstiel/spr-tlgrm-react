import { createDomain } from 'effector';

const cartDomain = createDomain();

type CartItem = {
    productId: number;
    quantity: number;
    pricePerItem: number;
};

type CartState = {
    items: CartItem[];
};

export const addProduct = cartDomain.createEvent<CartItem>();
export const removeProduct = cartDomain.createEvent<CartItem>();

const cartInitialState: CartState = {
    items: [],
};

export const $cart = cartDomain.createStore(cartInitialState).on(addProduct, (state, product) => {
    const newCartItems = [...state.items];
    const cartItem = newCartItems.find((item) => item.productId === product.productId);

    if (cartItem !== undefined) {
        cartItem.quantity += product.quantity;
    } else {
        newCartItems.push(product);
    }
    return { ...state, items: newCartItems };
}).on(removeProduct, (state, product) => {
    const newCartItems = [...state.items];
    const cartItem = newCartItems.find((item) => item.productId === product.productId);

    if (cartItem !== undefined) {
        cartItem.quantity -= product.quantity;
    }
    return { ...state, items: newCartItems.filter(product => product.quantity > 0) };
});

export const $cartTotalQuantity = $cart.map((state) =>
    state.items.reduce<number>((totalQuantity, product) => {
        totalQuantity += product.quantity;
        return totalQuantity;
    }, 0)
);

export const $cartTotalAmount = $cart.map((state) =>
    state.items.reduce<number>((totalAmount, product) => {
        totalAmount += product.pricePerItem * product.quantity;
        return totalAmount;
    }, 0)
);
