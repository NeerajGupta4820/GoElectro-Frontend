import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useGetLatestProductsQuery } from '../../redux/api/productAPI'; 
import ProductCard from '../ProductCard/ProductCard'; 
import Loader from '../Loader/Loader'; 
import './ProductSlider.css'; 

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); 
  const { data, isLoading } = useGetLatestProductsQuery(); 
  const products = data?.products || []; 

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
      <h1>Latest Products</h1>
      <Link to="/filter" className="findmore">More</Link>
      <main className="slider-main">
        {isLoading ? (
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
