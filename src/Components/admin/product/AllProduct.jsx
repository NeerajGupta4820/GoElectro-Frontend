import { useState } from 'react';
import { useGetAllProductsQuery } from '../../../redux/api/productAPI';
import './AllProduct.css';

const AllProduct = () => {
  const { data, isLoading, error } = useGetAllProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  const products = data?.products || [];

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = (e) => {
    if (e.target.classList.contains('product-popup')) {
      setSelectedProduct(null);
    }
  };

  return (
    <div className="product-table-container">
      <h1>All Products</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} onClick={() => handleRowClick(product)} className="product-row">
              <td>
                <img src={product.image} alt={product.title} className="product-table-image" />
              </td>
              <td>{product.title.slice(0, 10)}...</td>
              <td>${product.price}</td>
              <td>{product.description.slice(0, 20)}...</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <div className="product-popup" onClick={handleClosePopup}>
          <div className="popup-content">
            <span className="close-btn" onClick={() => setSelectedProduct(null)}>&times;</span>
            <h2>{selectedProduct.title}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="popup-image" />
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
