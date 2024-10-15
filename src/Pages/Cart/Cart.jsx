import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  setCartData,
} from "../../redux/slices/cartSlice";
import "./Cart.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  ); 

  useEffect(() => {
    const storedCart = localStorage.getItem("cartData");
    if (storedCart) {
      dispatch(setCartData(JSON.parse(storedCart)));
    } else {
      fetchCartData();
    }
  }, [dispatch]);

  const fetchCartData = async () => {
    try {
      console.log("Fetching cart data...");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/cart/get",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cartData = response.data;

      if (response.status === 200 && cartData.success) {
        dispatch(setCartData(cartData.cart));
        localStorage.setItem("cartData", JSON.stringify(cartData.cart));
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching cart data.");
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      handleRemove(itemId);
    } else {
      console.log(itemId);
      
      dispatch(updateQuantity({ productId: itemId, quantity })); 
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {totalQuantity === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={
                    item.productId.images[0]?.imageLinks[0] ||
                    "defaultImage.jpg"
                  }
                  alt={item.productId.title}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h4>{item.productId.title}</h4>
                  <p>Price: ₹{item.productId.price}</p>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ₹{item.productId.price * item.quantity}
                  <button
                    className="delete-button"
                    onClick={() => handleRemove(item.productId._id)}
                  >
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
              <span>{totalQuantity}</span> {/* Display totalQuantity */}
            </div>
            <div className="summary-item">
              <span>Total Price:</span>
              <span>₹{totalAmount}</span> {/* Display totalAmount */}
            </div>
            <div className="summary-item">
              <span>Discount (10%):</span>
              <span>- ₹{(totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax (5%):</span>
              <span>₹{(totalAmount * 0.05).toFixed(2)}</span>
            </div>
            <div className="summary-item subtotal">
              <span>Subtotal:</span>
              <span>
                ₹
                {(totalAmount - totalAmount * 0.1 + totalAmount * 0.05).toFixed(
                  2
                )}
              </span>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
