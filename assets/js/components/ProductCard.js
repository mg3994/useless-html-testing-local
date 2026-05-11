import { Component } from '../utils/component.js';
import { CartModule } from '../modules/cart.js';

export const ProductCard = {
    render(product) {
        const title = Component.create('h3', { textContent: product.title });
        const desc = Component.create('p', { textContent: product.description, className: 'text-muted' });
        
        // Handle variants if they exist
        const variantSelect = Component.create('select', { className: 'variant-select' });
        if (product.variants && product.variants.length > 0) {
            product.variants.forEach(variant => {
                const option = Component.create('option', { 
                    value: variant.name, 
                    textContent: `${variant.name} (+£${variant.priceModifier})`
                });
                variantSelect.appendChild(option);
            });
        }

        const priceDisplay = Component.create('div', { 
            className: 'price-display accent-text', 
            textContent: `£${product.basePrice}` 
        });

        const addBtn = Component.create('button', { 
            className: 'btn btn-primary', 
            textContent: 'Add to Cart',
            onClick: () => {
                let selectedVariant = null;
                let priceModifier = 0;
                
                if (product.variants && product.variants.length > 0) {
                    selectedVariant = variantSelect.value;
                    const variantObj = product.variants.find(v => v.name === selectedVariant);
                    priceModifier = variantObj ? variantObj.priceModifier : 0;
                }
                
                CartModule.addItem(product, selectedVariant, priceModifier);
            }
        });

        const cardContent = [title, desc, priceDisplay];
        if (product.variants && product.variants.length > 0) {
            cardContent.push(variantSelect);
        }
        cardContent.push(addBtn);

        return Component.create('div', { className: 'glass-card reveal' }, cardContent);
    }
};
