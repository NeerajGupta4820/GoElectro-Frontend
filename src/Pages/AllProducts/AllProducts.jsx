import React, { useState, useEffect } from "react";
import "./allProducts.css";
import { useGetAllProductsQuery } from "../../redux/api/productAPI";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useFetchAllCategoriesQuery } from "../../redux/api/categoryAPI";

const AllProducts = () => {
  const [Product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 100000], // Default price range
    brand: "",
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("default"); // New state for sorting option

  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const { data: categoryData } = useFetchAllCategoriesQuery();

  useEffect(() => {
    if (products) {
      setProduct(products.products);
      setFilteredProducts(products.products);
    }
  }, [products]);

  // Function to apply the filters
  const applyFilters = () => {
    let updatedProducts = Product;

    // Category Filter
    if (filters.category) {
      updatedProducts = updatedProducts.filter(
        (item) => item.category === filters.category
      );
    }

    // Price Range Filter
    updatedProducts = updatedProducts.filter(
      (item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
    );

    // Brand Filter
    if (filters.brand) {
      updatedProducts = updatedProducts.filter(
        (item) => item.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // Rating Filter
    if (filters.rating > 0) {
      updatedProducts = updatedProducts.filter(
        (item) => item.ratings >= filters.rating
      );
    }

    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Function to sort products based on selected option
  const sortProducts = (products) => {
    if (sortOption === "priceLowToHigh") {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      return products.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "oldest") {
      return products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    return products;
  };

  useEffect(() => {
    const sortedProducts = sortProducts([...filteredProducts]); // Make a copy for sorting
    setFilteredProducts(sortedProducts);
  }, [sortOption]);

  // Handling filter changes
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

  // Function to reset filters
  const resetFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 100000],
      brand: "",
      rating: 0,
    });
    setSortOption("default"); // Reset sort option
    setFilteredProducts(Product); // Reset to original product list
  };

  // Extract unique brands from the products
  const brands = [...new Set(Product.map(item => item.brand))];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>All Products</h1>
      <div className="p-container">
        <div className="filter-grid">
          {/* Category Filter */}
          <label>
            Category:
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All</option>
              {categoryData && categoryData.data.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          {/* Price Filter */}
          <label>
            Price Range:
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="100000"
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const value = Math.min(Number(e.target.value), filters.priceRange[1]);
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
                  const value = Math.max(Number(e.target.value), filters.priceRange[0]);
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

          {/* Brand Filter */}
          <label>
            Brand:
            <select name="brand" value={filters.brand} onChange={handleFilterChange}>
              <option value="">All</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </label>

          {/* Rating Filter */}
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              min="0"
              max="5"
              step="0.5"
            />
          </label>

          {/* Sort Options */}
          <label>
            Sort By:
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="default">Default</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>

          {/* Reset Filters Button */}
          <button onClick={resetFilters}>Reset Filters</button>
        </div>

        <div className="product-grid">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((item) => <ProductCard key={item._id} product={item} />)
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
