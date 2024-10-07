import { useNavigate } from "react-router-dom";
import AllCategories from "./AllCategories";
import { FaPlusCircle } from "react-icons/fa"; 
import "./AdminCategory.css";

const AdminCategory = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("create-category"); 
  };

  return (
    <div className="content-section">
      <div className="product-header">
        <h1>Category Management</h1>
        <button className="add-product-btn" onClick={handleAddProduct}>
        <FaPlusCircle />Add category
        </button>
      </div>
      <AllCategories />
    </div>
  );
};

export default AdminCategory;
