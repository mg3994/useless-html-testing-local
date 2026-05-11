import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { ProductCard } from '../components/ProductCard.js';

// Mock Data
const MOCK_PRODUCTS = [
    {
        id: 'p1',
        title: 'Neural Link Interface',
        description: 'Direct brain-to-computer connectivity with ultra-low latency.',
        basePrice: 999,
        variants: [
            { name: 'Standard (1Tbps)', priceModifier: 0 },
            { name: 'Pro (5Tbps)', priceModifier: 499 }
        ]
    },
    {
        id: 'p2',
        title: 'Quantum Core Drive',
        description: 'Portable quantum processing unit for edge computing.',
        basePrice: 2499,
        variants: []
    },
    {
        id: 'p3',
        title: 'Haptic Feedback Suit',
        description: 'Full-body sensory immersion for virtual environments.',
        basePrice: 1500,
        variants: [
            { name: 'Size S', priceModifier: 0 },
            { name: 'Size M', priceModifier: 0 },
            { name: 'Size L', priceModifier: 50 }
        ]
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Mount Navbar
    const navbarContainer = document.getElementById('navbar-container');
    navbarContainer.appendChild(Navbar.render());

    // Mount Footer
    const footerContainer = document.getElementById('footer-container');
    footerContainer.appendChild(Footer.render());

    // Render Products
    const productsGrid = document.getElementById('products-grid');
    MOCK_PRODUCTS.forEach((product, index) => {
        const card = ProductCard.render(product);
        // Stagger the reveal animation
        card.classList.add(`delay-${(index % 3) + 1}`);
        productsGrid.appendChild(card);
    });

    // Setup Intersection Observer for Scroll Animations
    setupScrollAnimations();
});

function setupScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(element => {
        observer.observe(element);
    });
}
