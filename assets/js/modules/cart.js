import { store, createEffect } from './state.js';

// Initialize the cart signal
// Cart state will be an array of objects: 
// { cartItemId: string, productId: string, title: string, price: number, quantity: number, variant: string }
store.initSignal('cart', []);

export const CartModule = {
    /**
     * Generate a unique cart item ID based on product and variant
     */
    generateCartItemId(productId, variant) {
        return `${productId}-${variant || 'default'}`;
    },

    /**
     * Add an item to the cart
     */
    addItem(product, variant, priceModifier = 0) {
        const cart = store.get('cart');
        const cartItemId = this.generateCartItemId(product.id, variant);
        
        const existingItemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
        
        const updatedCart = [...cart];
        
        if (existingItemIndex > -1) {
            updatedCart[existingItemIndex].quantity += 1;
        } else {
            updatedCart.push({
                cartItemId,
                productId: product.id,
                title: product.title,
                price: product.basePrice + priceModifier,
                quantity: 1,
                variant
            });
        }
        
        store.set('cart', updatedCart);
    },

    /**
     * Get total number of items in cart
     */
    getTotalCount() {
        const cart = store.get('cart');
        return cart.reduce((total, item) => total + item.quantity, 0);
    },

    /**
     * Subscribe to cart changes
     */
    subscribe(callback) {
        createEffect(() => {
            const cart = store.get('cart');
            callback(cart);
        });
    }
};
