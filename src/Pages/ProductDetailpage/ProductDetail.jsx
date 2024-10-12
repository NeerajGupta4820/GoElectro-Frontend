import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/api/productAPI";
import Loader from "../../Components/Loader/Loader";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);
  const product = data?.product;

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(""); 

  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedColor(product.images[0].color); 
      setSelectedImage(product.images[0].imageLinks[0]);
    }
  }, [product]);

  if (isLoading) return <Loader />;
  if (isError || !product) return <p>Product not found</p>;

  const imagesToDisplay = product.images.filter(
    (image) => image.color === selectedColor
  );

  return (
    <div className="product-detail-container">
      <div className="product-detail-left">
        <div className="product-thumbnails">
          {imagesToDisplay.length > 0 &&
            imagesToDisplay[0].imageLinks.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`${product.title} thumbnail ${index + 1}`}
                className={`thumbnail-image ${imgUrl === selectedImage ? "active-thumbnail" : ""}`}
                onClick={() => setSelectedImage(imgUrl)}
              />
            ))}
        </div>
        <div className="product-main-image">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected product"
              className="main-image"
            />
          )}
        </div>
      </div>

      <div className="product-detail-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h2>Price: ${product.price}</h2>
        <p>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
        <p>Rating: {product.ratings}</p>
        <p>Category: {product.category?.name}</p>
        <div className="color-options">
          <h3>Select Color:</h3>
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`color-option ${selectedColor === image.color ? "active" : ""}`}
              onClick={() => {
                setSelectedColor(image.color);
                setSelectedImage(image.imageLinks[0]); 
              }}
              style={{ backgroundColor: image.color }}
            >
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
