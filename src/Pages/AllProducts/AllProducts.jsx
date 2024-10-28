import React, { useState, useEffect } from "react";
import "./allProducts.css";
import { useGetAllProductsQuery } from "../../redux/api/productAPI";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useFetchAllCategoriesQuery } from "../../redux/api/categoryAPI";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const AllProducts = () => {
  const [Product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const location = useLocation();
  const [filters, setFilters] = useState({
    category: location.state?.category || "",
    priceRange: [0, 100000],
    brands: [],
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("default");

  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const { data: categoryData } = useFetchAllCategoriesQuery();

  useEffect(() => {
    if (products) {
      setProduct(products.products);
      setFilteredProducts(products.products);
    }
  }, [products]);

  const applyFilters = () => {
    let updatedProducts = Product;

    if (filters.category) {
      updatedProducts = updatedProducts.filter(
        (item) => item.category === filters.category
      );
    }

    updatedProducts = updatedProducts.filter(
      (item) =>
        item.price >= filters.priceRange[0] &&
        item.price <= filters.priceRange[1]
    );

    if (filters.brands.length > 0) {
      updatedProducts = updatedProducts.filter((item) =>
        filters.brands.includes(item.brand)
      );
    }

    if (filters.rating > 0) {
      updatedProducts = updatedProducts.filter(
        (item) => item.ratings >= filters.rating
      );
    }

    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, Product]);

  useEffect(() => {
    if (location.state?.category) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: location.state.category,
      }));
    }
  }, [location.state?.category]);

  const sortProducts = (products) => {
    if (sortOption === "priceLowToHigh") {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      return products.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      return products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOption === "oldest") {
      return products.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    return products;
  };

  useEffect(() => {
    const sortedProducts = sortProducts([...filteredProducts]);
    setFilteredProducts(sortedProducts);
  }, [sortOption]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.split(",").map(Number);
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: value,
    }));
  };

  const handleBrandChange = (brand) => {
    setFilters((prevFilters) => {
      const isBrandSelected = prevFilters.brands.includes(brand);

      const updatedBrands = isBrandSelected
        ? prevFilters.brands.filter((b) => b !== brand)
        : [...prevFilters.brands, brand];

      return {
        ...prevFilters,
        brands: updatedBrands,
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 100000],
      brands: [],
      rating: 0,
    });
    setSortOption("default");
    setFilteredProducts(Product);
    setCurrentPage(1);
  };

  const brands = [...new Set(Product.map((item) => item.brand))];

  const handleStarClick = (rating) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating,
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 style={{textAlign:"center"}}>All Products</h1>
      <div className="p-container">
        <div className="filter-grid">
          <label>
            Category:
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {categoryData &&
                categoryData.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Price Range:
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="100000"
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const value = Math.min(
                    Number(e.target.value),
                    filters.priceRange[1]
                  );
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    priceRange: [value, prevFilters.priceRange[1]],
                  }));
                }}
              />
              <input
                type="range"
                min="0"
                max="100000"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const value = Math.max(
                    Number(e.target.value),
                    filters.priceRange[0]
                  );
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    priceRange: [prevFilters.priceRange[0], value],
                  }));
                }}
              />
            </div>
            <span>
              {filters.priceRange[0]} - {filters.priceRange[1]}
            </span>
          </label>

          <label>
            Sort By:
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>

          <button onClick={resetFilters}>Reset Filters</button>
        </div>

        <div className="cont">
          <div className="add-filter">
            <label>
              Rating:
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    color={star <= filters.rating ? "#ffc107" : "#e4e5e9"}
                    onClick={() => handleStarClick(star)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </label>

            <label>
              Brand:
              <div className="brand-checkboxes">
                {brands.map((brand, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <label>{brand}</label>
                  </div>
                ))}
              </div>
            </label>
          </div>
          <div className="product-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
