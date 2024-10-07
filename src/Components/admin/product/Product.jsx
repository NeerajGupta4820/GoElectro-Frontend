import { Routes, Route } from "react-router-dom";
import AdminProduct from "./AdminProduct"; 
import CreateProduct from "./CreateProduct"; 
import EditProduct from "./UpdateProduct";

const Product = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminProduct />} /> 
      <Route path="createproduct" element={<CreateProduct />} /> 
      <Route path="edit/:id" element={<EditProduct />} /> 
    </Routes>
  );
};

export default Product;
