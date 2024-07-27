import { ADD_TO_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY } from './action';

const initialState = {
    cart: {},
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { id } = action.payload;
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [id]: {
                        ...action.payload,
                        quantity: (state.cart[id]?.quantity || 0) + 1,
                    },
                },
            };
        case INCREMENT_QUANTITY:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload]: {
                        ...state.cart[action.payload],
                        quantity: state.cart[action.payload].quantity + 1,
                    },
                },
            };
        case DECREMENT_QUANTITY:
            const currentQuantity = state.cart[action.payload]?.quantity || 0;
            if (currentQuantity > 1) {
                return {
                    ...state,
                    cart: {
                        ...state.cart,
                        [action.payload]: {
                            ...state.cart[action.payload],
                            quantity: currentQuantity - 1,
                        },
                    },
                };
            } else {
                const { [action.payload]: _, ...rest } = state.cart;
                return {
                    ...state,
                    cart: rest,
                };
            }
        default:
            return state;
    }
};

export default cartReducer;
