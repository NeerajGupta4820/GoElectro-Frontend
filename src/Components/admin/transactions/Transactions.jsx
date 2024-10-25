import { useState } from "react";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "../../../redux/api/orderAPI";
import "./Transactions.css";

const AdminTransactions = () => {
  const { data, error, isLoading } = useGetAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  
  const [orders, setOrders] = useState([]);

  if (data && orders.length === 0) {
    setOrders(Array.isArray(data) ? data : data?.orders || []);
  }

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Failed to load orders: {error.message}</p>;

  const openPopup = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  const closePopup = () => {
    setSelectedOrder(null);
  };

  const handleChangeStatus = async () => {
    if (selectedOrder) {
      const updatedOrders = orders.map((order) => {
        if (order._id === selectedOrder._id) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setOrders(updatedOrders);

      await updateOrderStatus({ id: selectedOrder._id, status: newStatus });
      closePopup();
    }
  };

  return (
    <div className="Transactions-orders">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <table className="Transactions-orders-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.orderItems.map((item, index) => (
                <tr key={`${order._id}-${item.productId}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={order.orderItems.length}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td rowSpan={order.orderItems.length}>Rs.{order.total.toFixed(2)}</td>
                      <td rowSpan={order.orderItems.length}>{order.status}</td>
                    </>
                  )}
                  <td>
                    <div className="Transactions-order-item">
                      <img src={item.photo} alt={item.name} />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>Rs.{item.price.toFixed(2)}</td>
                  {index === 0 && (
                    <td rowSpan={order.orderItems.length}>
                      <button onClick={() => openPopup(order)} className="Transactions-view-order-details">
                        View Details
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {selectedOrder && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={closePopup} className="close-button">×</button>
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> Rs.{selectedOrder.total.toFixed(2)}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>

            <h4>Items:</h4>
            <ul>
              {selectedOrder.orderItems.map((item) => (
                <li key={item.productId}>
                  {item.name} - Qty: {item.quantity} - Rs.{item.price.toFixed(2)}
                </li>
              ))}
            </ul>

            <div className="status-update">
              <label>Status:</label>
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button onClick={handleChangeStatus} className="change-status-button">Change</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
