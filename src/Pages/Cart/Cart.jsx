import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    console.log(id);
    
    dispatch(removeFromCart({ id}));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  // Function to calculate the total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Discount and tax calculations
  const discount = getTotalPrice() * 0.1;
  const tax = getTotalPrice() * 0.05;
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
                <img
                  src={item.product.images[0].imageLinks[0]}
                  alt={item.product.title}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h4>{item.product.title}</h4>
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                  <button
                    className="delete-button"
                    onClick={() => handleRemove(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section: Order Summary */}
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
