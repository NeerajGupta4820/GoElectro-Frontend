import  { useState, useRef } from 'react'; 
import { FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [buttonColor, setButtonColor] = useState('#rgb(247, 139, 90)'); 

  const colors = ['#4dbdd6', '#28a745', '#ffc107', '#dc3545'];
  const currentIndex = useRef(0); 

  const handleAddToCart = () => {
    currentIndex.current = (currentIndex.current + 1) % colors.length;
    setButtonColor(colors[currentIndex.current]);

    setIsAdded(true);
    
    setTimeout(() => {
      setButtonColor('#rgb(247, 139, 90)'); 
      setIsAdded(false);
    }, 1500); 
  };

  return (
    <div className="product-card">
      <img src={product.photos[0]} alt={product.name} className="product-photo" />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <p>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
      <p className="product-rating">Rating: {product.ratings}</p>
      <button 
        className={`add-to-cart ${isAdded ? 'added' : ''}`} 
        onClick={handleAddToCart}
        style={{ backgroundColor: buttonColor }} 
      >
        <FaShoppingCart className={`cart-icon ${isAdded ? 'move' : ''}`} />
        {isAdded ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
