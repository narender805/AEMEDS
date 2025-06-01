export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
 
  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
 const products = document.querySelector('.productlist');
  const totalDisplay = document.querySelector('.total');

  if (!products || !totalDisplay) {
    console.warn('Cart elements (.productlist or .total) not found on this page.');
    return;
  }

  let cartItems = [];
  let cartTotal = 0;
  let itemCount = 0;

  const cartButton = block.querySelector('#add-to-cart');

  function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartItemCount', itemCount);
    localStorage.setItem('cartTotal', cartTotal.toFixed(2));
  }

  function updateHeaderAndTotal() {
    if (typeof window.updateHeaderCartQty === 'function') {
      window.updateHeaderCartQty(itemCount);
    }

    totalDisplay.textContent = `Subtotal (${itemCount} item${itemCount !== 1 ? 's' : ''}) $${cartTotal.toFixed(2)}`;
  }

  function updateCart(countChange, priceChange) {
    itemCount += countChange;
    cartTotal += priceChange;
    updateHeaderAndTotal();
  }

  function createCartItemElement(item) {
    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.innerHTML = `
      <div>
        ${item.title} - $<span class="item-price">${item.price.toFixed(2)}</span>
        <div class="qty-controls">
          <button class="minus">-</button>
          <span class="item-qty">${item.quantity}</span>
          <button class="plus">+</button>
        </div>
      </div>
      ${item.imageHTML}
    `;

    const plusBtn = li.querySelector('.plus');
    const minusBtn = li.querySelector('.minus');
    const qtySpan = li.querySelector('.item-qty');

    let quantity = item.quantity;

    plusBtn.addEventListener('click', () => {
      quantity++;
      qtySpan.textContent = quantity;
      item.quantity = quantity;
      updateCart(1, item.price);
      saveCart();
    });

    minusBtn.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        qtySpan.textContent = quantity;
        item.quantity = quantity;
        updateCart(-1, -item.price);
      } else {
        products.removeChild(li);
        const index = cartItems.indexOf(item);
        if (index > -1) cartItems.splice(index, 1);
        updateCart(-1, -item.price);
      }
      saveCart();
    });

    return li;
  }

  function restoreCart() {
    try {
      const savedCart = localStorage.getItem('cartItems');
      const savedTotal = localStorage.getItem('cartTotal');
      const savedCount = localStorage.getItem('cartItemCount');

      if (savedCart) {
        cartItems = JSON.parse(savedCart);
        itemCount = parseInt(savedCount, 10) || 0;
        cartTotal = parseFloat(savedTotal) || 0;

        cartItems.forEach(item => {
          const li = createCartItemElement(item);
          products.appendChild(li);
        });

        updateHeaderAndTotal();
        console.log('Cart restored:', cartItems, itemCount, cartTotal);
      } else {
        console.log('No cart found in localStorage');
      }
    } catch (e) {
      console.error('Error restoring cart from localStorage', e);
      cartItems = [];
      itemCount = 0;
      cartTotal = 0;
    }
  }

  if (cartButton) {
    cartButton.addEventListener('click', () => {
      const heading = block.querySelector('h2');
      const image = block.querySelector('picture');
      const priceElement = block.querySelector('h4');

      const headingText = heading ? heading.textContent.trim() : 'No heading';

      let imageHTML = '';
      if (image) {
        const imageClone = image.cloneNode(true);
        imageHTML = imageClone.outerHTML;
      }

      let price = 0;
      if (priceElement) {
        const rawText = priceElement.textContent.trim();
        const numericText = rawText.replace(/[^\d.]/g, '');
        price = parseFloat(numericText);
      }

      // Check if item already exists
      const existingItem = cartItems.find(item => item.title === headingText);

      if (existingItem) {
        existingItem.quantity++;
        // Update quantity display in the UI
        const li = Array.from(products.children).find(li =>
          li.textContent.includes(existingItem.title)
        );
        if (li) {
          const qtySpan = li.querySelector('.item-qty');
          qtySpan.textContent = existingItem.quantity;
        }
        updateCart(1, price);
      } else {
        const newItem = {
          title: headingText,
          price: price,
          quantity: 1,
          imageHTML: imageHTML,
        };
        cartItems.push(newItem);
        const li = createCartItemElement(newItem);
        products.appendChild(li);
        updateCart(1, price);
      }

      saveCart();
      console.log('Item added to cart:', headingText, price);
    });
  } else {
    console.log('Add to Cart button not found.');
  }

  restoreCart();
}