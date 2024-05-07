import http from 'k6/http';
import { check, group, fail } from 'k6';

// Define URLs 
const baseUrl = 'http://10.66.12.166:31812/';
const cartPageUrl = `${baseUrl}/cart`;

// Define checkout button selector
const checkoutButtonSelector = 'button[type="submit"]';

export default function() {
  group('Browse and add product to cart', () => {
    // Browse the product page
    const productResponse = http.get(baseUrl);
    check(productResponse, 'Product page loaded successfully').status(200);

    // Find "Add to Cart" button and verify
    const addToCartButton = productResponse.body.all('button').find(el => el.text.includes('Add to Cart'));
    check(addToCartButton, 'Add to cart button found').ok();

    // Add product to cart 
    const addToCartResponse = http.post(addToCartButton.attr('href'));
    check(addToCartResponse, 'Product added to cart').status(200); 
  });

  group('Checkout', () => {
    // Navigate to cart page
    const cartResponse = http.get(cartPageUrl);
    check(cartResponse, 'Cart page loaded successfully').status(200);

    // Click on checkout button and verify
    const checkoutButton = cartResponse.body.all(checkoutButtonSelector);
    check(checkoutButton, 'Checkout button found').ok();

    try {
      const checkoutResponse = http.post(checkoutButton.attr('href'));
      check(checkoutResponse, 'Checkout successful').status(200); 
    } catch (error) {
      fail(`Checkout failed: ${error.message}`); 
    }
  });
}