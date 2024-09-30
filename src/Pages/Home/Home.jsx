import  { useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import img1 from "../../assets/Images/home/categories/electronics-shopping.webp";
import img2 from "../../assets/Images/home/categories/fashion.jpeg";
import img3 from "../../assets/Images/home/categories/home-appliances.jpeg";
import img4 from "../../assets/Images/home/categories/books.jpeg";
import img5 from "../../assets/Images/home/categories/toys.jpeg";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import Sale from "../../Components/Sale/Sale";
import UpcomingProducts from "../../Components/upcomingProducts/UpcomingProducts";

const Home = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setMessage(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <div>
      <Header />
      <div className="categories-section">
        <ul className="categories-list">
          <li>
            <Link to="/category/electronics">
              <img
                src={img1}
                alt="Electronics"
                className="category-image"
              />
              Electronics
            </Link>
          </li>
          <li>
            <Link to="/category/fashion">
              <img
                src={img2}
                alt="Fashion"
                className="category-image"
              />
              Fashion
            </Link>
          </li>
          <li>
            <Link to="/category/home-appliances">
              <img
                src={img3}
                alt="Home Appliances"
                className="category-image"
              />
              Home Appliances
            </Link>
          </li>
          <li>
            <Link to="/category/books">
              <img
                src={img4}
                alt="Books"
                className="category-image"
              />
              Books
            </Link>
          </li>
          <li>
            <Link to="/category/toys">
              <img
                src={img5}
                alt="Toys"
                className="category-image"
              />
              Toys
            </Link>
          </li>
        </ul>
      </div>
      <ProductSlider />
      <Sale />
      <section className="newsletter-section">
        <h2>Subscribe to Our Newsletter</h2>
        <form onSubmit={handleSubscribe} className="newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="newsletter-input"
          />
          <button type="submit" className="newsletter-button">Subscribe</button>
        </form>
        {message && <p className="subscription-message">{message}</p>}
      </section>
      <UpcomingProducts/>
    </div>
  );
};

export default Home;
