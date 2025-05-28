export default function decorate(block) {
  // Create a wrapper div with class 'cart'
  const cart = document.createElement('div');
  cart.classList.add('cart');

  // Heading
  const heading = document.createElement('h3');
  heading.textContent = 'Your Cart';

  // Product list
  const productlist = document.createElement('ul');
  productlist.classList.add('productlist');

  // Checkout section
  const checkout = document.createElement('div');
  checkout.classList.add('checkout');

  const total = document.createElement('div');
  total.classList.add('total');
  total.textContent = 'Subtotal (0 items)  $0';

  const close = document.createElement('div');
  close.classList.add('close');
  close.textContent = 'Close';

  // Append total and close button to checkout section
  checkout.appendChild(total);
  checkout.appendChild(close);

  // Append all elements to the cart wrapper
  cart.appendChild(heading);
  cart.appendChild(productlist);
  cart.appendChild(checkout);

  // Append the cart to the block
  block.appendChild(cart);
  const closed = block.querySelector('.close');

  if (closed) {
    closed.addEventListener('click', () => {
      document.body.classList.remove('active');
    });
  }
}
