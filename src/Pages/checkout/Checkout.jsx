import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation } from "../../redux/api/orderAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/slices/cartSlice";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.cart.cart || {});
  const user = useSelector((state) => state.user.user);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const [addOrder] = useAddOrderMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      shippingInfo,
      subtotal: totalAmount,
      tax: totalAmount * 0.05,
      shippingCharges: 0,
      discount: totalAmount * 0.1,
      total: totalAmount - totalAmount * 0.1 + totalAmount * 0.05,
      orderItems: cartItems.map(item => ({
        name: item.productId.title,
        photo: item.productId.images[0]?.imageLinks[0],
        price: item.productId.price,
        quantity: item.quantity,
        productId: item.productId._id,
      })),
      user: user._id,
    };
    try {
      await addOrder(orderData).unwrap();
      dispatch(clearCart());
      toast.success("Checkout successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error(
        `❌ Checkout Failed: ${error.response?.data?.message || error.message}`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          theme: "dark",
        }
      );
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-progress">Step 2: Shipping Details</div>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="checkout-form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="checkout-form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={shippingInfo.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="checkout-form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="checkout-form-group">
            <label>Pin Code</label>
            <input
              type="number"
              name="pinCode"
              value={shippingInfo.pinCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="place-order-button"
            disabled={
              !shippingInfo.address ||
              !shippingInfo.city ||
              !shippingInfo.state ||
              !shippingInfo.country ||
              !shippingInfo.pinCode
            }
          >
            Place Order
          </button>
        </form>

        <div className="checkout-cart-summary">
          <h3>Your Cart</h3>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.productId._id}>
              <img src={item.productId.images[0]?.imageLinks[0]} alt={item.productId.title} />
              <div style={{color:"black"}}>
                <p>{item.productId.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.productId.price}</p>
              </div>
            </div>
          ))}
          <p>Total: ${totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className="checkout-payment-options">
        <p>Payment Options:</p>
        <button className="payment-option">Pay with PayPal</button>
        <button className="payment-option">Pay with Google Pay</button>
      </div>

      <div className="checkout-trust-symbols">
        <img src="/images/ssl-badge.png" alt="SSL Secure" />
        <img src="/images/trust-badge.png" alt="Trusted Payment" />
      </div>
    </div>
  );
};

export default Checkout;
