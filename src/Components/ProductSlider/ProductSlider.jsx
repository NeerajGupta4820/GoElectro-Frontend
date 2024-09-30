import  { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard'; 
import Loader from '../Loader/Loader'; 
import './ProductSlider.css'; 
import img1 from '../../assets/Images/dummy/1.webp';
import img2 from '../../assets/Images/dummy/2.webp';
import img3 from '../../assets/Images/dummy/3.webp';
import img4 from '../../assets/Images/dummy/4.webp';
import img5 from '../../assets/Images/dummy/5.webp';

const dummyProducts = [
  { _id: '1', name: 'Product 1', price: '$20', stock: 5, ratings: 4, photos: [img1] },
  { _id: '2', name: 'Product 2', price: '$25', stock: 10, ratings: 5, photos: [img2] },
  { _id: '3', name: 'Product 3', price: '$30', stock: 3, ratings: 3, photos: [img3] },
  { _id: '4', name: 'Product 4', price: '$40', stock: 0, ratings: 2, photos: [img4] },
  { _id: '5', name: 'Product 5', price: '$50', stock: 6, ratings: 4, photos: [img5] },
];

const ProductSlider = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); 

  useEffect(() => {
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }); 
  }, []);

  useEffect(() => {
    if (isHovered) return; 

    const slideInterval = setInterval(() => {
      handleNextClick();
    }, 2000); 

    return () => clearInterval(slideInterval); 
  }, [currentIndex, products, isHovered]); 

  const handlePrevClick = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  }, [products]);

  const handleNextClick = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
  }, [products]);

  const getProductsToShow = () => {
    const end = currentIndex + 4;
    return products.slice(currentIndex, end).concat(products.slice(0, Math.max(0, end - products.length)));
  };

  return (
    <div 
      className="product-slider" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      <h1>
        Latest Products
      </h1>
      <Link to="/filter" className="findmore">
          More
        </Link>
      <main className="slider-main">
        {loading ? (
          <Loader type="data" /> 
        ) : (
          <div className="slider-container">
            <button className="slider-button prev" onClick={handlePrevClick}>
              &lt;
            </button>
            <div className="slider-track">
              {getProductsToShow().map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <button className="slider-button next" onClick={handleNextClick}>
              &gt;
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductSlider;
