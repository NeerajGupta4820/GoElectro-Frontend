import  { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Header from "../../Components/Header/Header";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import Sale from "../../Components/Sale/Sale";
import UpcomingProducts from "../../Components/upcomingProducts/UpcomingProducts";
import { useFetchAllCategoriesQuery } from "../../redux/api/categoryAPI"; 

const Home = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const { data: categories, isLoading, isError } = useFetchAllCategoriesQuery();
  console.log(categories)
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
          {isLoading && <p>Loading categories...</p>}
          {isError && <p>Failed to load categories. Please try again later.</p>}
          {categories && categories.data.map((category) => (
            <li key={category.id}>
              <Link to={`/category/${category.slug}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                {category.name}
              </Link>
            </li>
          ))}
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
      <UpcomingProducts />
    </div>
  );
};

export default Home;
