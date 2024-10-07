import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../redux/api/productAPI"; 
import { FaPlusCircle, FaArrowLeft } from "react-icons/fa"; 
import "./CreateProduct.css";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]); 

  const [addProduct] = useAddProductMutation(); 
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    images.forEach((image) => formData.append("images", image)); 

    try {
      await addProduct(formData);
      navigate("/admin/product");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="create-product-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <h2>Create New Product</h2>
      <form className="create-product-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Product Images</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          <FaPlusCircle /> Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
