/**
 * Component Utility for safe DOM creation without innerHTML
 */
export const Component = {
    /**
     * Creates a DOM element with given attributes and children.
     * @param {string} tag - The HTML tag name.
     * @param {object} attributes - Key-value pairs of attributes or properties (e.g. className, textContent).
     * @param {Array<HTMLElement|string>} children - Array of child elements or strings.
     * @returns {HTMLElement}
     */
    create(tag, attributes = {}, children = []) {
        const el = document.createElement(tag);

        for (const [key, value] of Object.entries(attributes)) {
            // Special handling for event listeners (e.g., onClick)
            if (key.startsWith('on') && typeof value === 'function') {
                const eventName = key.substring(2).toLowerCase();
                el.addEventListener(eventName, value);
            } 
            // Handle properties vs attributes
            else if (key === 'className') {
                el.className = value;
            } else if (key === 'textContent') {
                el.textContent = value;
            } else if (key === 'value' && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA')) {
                el.value = value;
            } else {
                el.setAttribute(key, value);
            }
        }

        children.forEach(child => {
            if (typeof child === 'string' || typeof child === 'number') {
                el.appendChild(document.createTextNode(String(child)));
            } else if (child instanceof HTMLElement) {
                el.appendChild(child);
            }
        });

        return el;
    }
};
