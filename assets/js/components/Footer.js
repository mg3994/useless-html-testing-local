import { Component } from '../utils/component.js';

export const Footer = {
    render() {
        const text = Component.create('p', { textContent: '© 2026 Antinna Project. Intelligent. Integrated. Infinite.' });
        return Component.create('footer', { className: 'footer layout-container' }, [text]);
    }
};
