import { useState, useRef } from 'react'; 
import { FaShoppingCart } from 'react-icons/fa';
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [buttonColor, setButtonColor] = useState('#rgb(247, 139, 90)'); 

  const colors = ['#4dbdd6', '#28a745', '#ffc107', '#dc3545'];
  const currentIndex = useRef(0); 

  const handleAddToCart = () => {
    currentIndex.current = (currentIndex.current + 1) % colors.length;
    setButtonColor(colors[currentIndex.current]);
    dispatch(addToCart({productId:product._id,price:product.price,quantity:1,name:product.title,images:product.images}));
    toast.success("Added",{
      position:"top-center",
      autoClose:1000,
      hideProgressBar:true,
      theme:"dark",
    })
    setIsAdded(true);
    
    setTimeout(() => {
      setButtonColor('#rgb(247, 139, 90)'); 
      setIsAdded(false);
    }, 1500); 
  };

  const productImage = product.images && product.images.length > 0 && product.images[0].imageLinks.length > 0 
    ? product.images[0].imageLinks[0] 
    : 'path/to/placeholder-image.jpg';

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={productImage} alt={product.title} className="product-photo" />
        <h3 className="product-title">{product.title}</h3>
      </Link>
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
