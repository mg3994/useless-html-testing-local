import { Component } from '../utils/component.js';
import { CartModule } from '../modules/cart.js';

export const Navbar = {
    render() {
        const logo = Component.create('div', { className: 'nav-brand accent-text', textContent: 'ANTINNA' });
        
        const cartCountSpan = Component.create('span', { className: 'cart-count', textContent: ' (0)' });
        const cartBtn = Component.create('button', { className: 'btn' }, [
            'Cart',
            cartCountSpan
        ]);

        // Reactive update for cart count
        CartModule.subscribe(() => {
            const count = CartModule.getTotalCount();
            cartCountSpan.textContent = ` (${count})`;
            
            // Add a pulse animation class temporarily
            cartBtn.classList.add('pulse');
            cartBtn.style.animation = 'pulse-glow 0.5s ease';
            setTimeout(() => { cartBtn.style.animation = ''; }, 500);
        });

        const navContent = Component.create('div', { className: 'nav-content layout-container' }, [logo, cartBtn]);
        const nav = Component.create('nav', { className: 'navbar' }, [navContent]);

        return nav;
    }
};
