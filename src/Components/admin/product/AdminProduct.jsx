import { useNavigate } from "react-router-dom";
import AllProduct from "./AllProduct";
import { FaPlusCircle } from "react-icons/fa"; 
import "./AdminProduct.css";

const AdminProduct = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("createproduct"); 
  };

  return (
    <div className="content-section">
      <div className="product-header">
        <h1>Product Management</h1>
        <button className="add-product-btn" onClick={handleAddProduct}>
        <FaPlusCircle />Add Product
        </button>
      </div>
      <AllProduct />
    </div>
  );
};

export default AdminProduct;
