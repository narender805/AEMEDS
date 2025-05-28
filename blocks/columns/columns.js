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
let checkOutList = [];
const addToCartButton = document.querySelector('.button');
addToCartButton.addEventListener('click', () =>
  {
    const yourCart = document.createElement('div');
    yourCart.classList.add('cart');
    const heading = document.createElement('h3';
      heading.textContent = 'Your Cart';
      const productlist = document.createElement('ul');
      productlist.classList.add('productlist');
      const checkout = document.createElement('div');
    checkout.classList.add('checkout');
    const total = document.createElement('div');
    total.classList.add('total');
    const small = document.createElement('small');
    small.textContent = 'Total: $0.00';
    total.textContent = '0';
    const close = document.createElement('div')
    close.classList.add('close');
    close.textContent = 'close';
    checkout.appendChild(total);
    checkout.appendChild(close);
    yourCart.appendChild(heading);
    yourCart.appendChild(productlist);
    yourCart.appendChild(checkout);
  });
    
  function onInIt(){

  }
}
