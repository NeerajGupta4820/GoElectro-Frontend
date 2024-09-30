import  { useState } from 'react';
import './Cart.css';
import productImage from '../../assets/Images/dummy/1.webp';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sample Product 1',
      price: 500,
      quantity: 1,
      image: productImage,
    },
    {
      id: 2,
      name: 'Sample Product 2',
      price: 750,
      quantity: 2,
      image: productImage,
    },
    {
      id: 3,
      name: 'Sample Product 3',
      price: 750,
      quantity: 2,
      image: productImage,
    },
  ]);

  const updateQuantity = (id, action) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: action === 'increase' ? item.quantity + 1 : item.quantity - 1,
          }
        : item
    );
    setCartItems(updatedCart.filter((item) => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discount = 0.1 * getTotalPrice(); // 10% discount for example
  const tax = 0.05 * getTotalPrice(); // 5% tax
  const subtotal = getTotalPrice() - discount + tax;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          {/* Left Section: Product Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 'increase')}>+</button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                  <button className="delete-button" onClick={() => removeFromCart(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="summary-item">
              <span>Total Price:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div className="summary-item">
              <span>Discount (10%):</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax (5%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-item subtotal">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
