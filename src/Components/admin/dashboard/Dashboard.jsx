import "./Dashboard.css";

const Dashboard = () => {
  const productsList = [
    { name: "Laptop", quantity: 500 },
    { name: "Mobile", quantity: 800 },
    { name: "Headphone", quantity: 300 },
    { name: "Shirt", quantity: 700 },
    { name: "Jeans", quantity: 200 },
    { name: "Jacket", quantity: 150 },
    { name: "Sofa", quantity: 100 },
    { name: "Table", quantity: 400 },
    { name: "Chair", quantity: 250 },
  ];

  const maxQuantity = Math.max(...productsList.map((product) => product.quantity));

  const headerData = [
    { label: "Total Users", value: 1200, percentage: 75 },
    { label: "Total Products", value: 3500, percentage: 90 },
    { label: "Total Categories", value: 35, percentage: 100 },
    { label: "Total Sale", value: "Rs.50,000", percentage: 60 },
    { label: "Revenue", value: "Rs.80,000", percentage: 95 },
  ];

  const topProducts = [
    { name: "Product A", quantitySold: 200 },
    { name: "Product B", quantitySold: 150 },
    { name: "Product C", quantitySold: 120 },
    { name: "Product D", quantitySold: 100 },
    { name: "Product E", quantitySold: 90 },
  ];

  const topTransactions = [
    { id: "TX123", customer: "John Doe", amount: "$200", date: "2024-10-10" },
    { id: "TX124", customer: "Jane Smith", amount: "$150", date: "2024-10-09" },
    { id: "TX125", customer: "Chris Brown", amount: "$100", date: "2024-10-08" },
    { id: "TX126", customer: "Lisa Ray", amount: "$50", date: "2024-10-07" },
  ];

  const productCategories = [
    { category: "Electronics", products: ["Laptop", "Mobile", "Headphone"] },
    { category: "Clothing", products: ["Shirt", "Jeans", "Jacket"] },
    { category: "Furniture", products: ["Sofa", "Table", "Chair"] },
  ];

  return (
    <div className="main-dashboard">
      <div className="dashboard-header">
        {headerData.map((item, index) => (
          <div className="dashboard-header-cards" key={index}>
            <h4>{item.label}</h4>
            <p>{item.value}</p>
            <div className="percentage-circle">
              <div
                className="circle"
                style={{
                  background: `conic-gradient(#4caf50 ${item.percentage * 3.6}deg, #ddd 0deg)`,
                }}
              ></div>
              <p className="percentage-value">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-inventory">
        <div className="dashboard-mostsaleProducts">
          <h4>Top Products Sold</h4>
          <table className="top-products-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantitySold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-products-inventory">
          <h4>Product Inventory</h4>
          <p>Total Products: 3500</p>
          <div className="products-list-section">
            {productsList.map((product, index) => (
              <div key={index} className="product-item">
                <span className="product-name">{product.name}</span>
                <div
                  className="product-quantity-line"
                  style={{
                    width: `${(product.quantity / maxQuantity) * 100}%`,
                    backgroundColor:
                      product.quantity > 700
                        ? "#ff5733"
                        : product.quantity > 400
                        ? "#fbc02d"
                        : "#4caf50",
                  }}
                  title={`Quantity: ${product.quantity}`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-category-inventory">
          <h4>Category Inventory</h4>
          {productCategories.map((category, index) => (
            <div key={index} className="category-list">
              <h5>{category.category}</h5>
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard-top-transactions">
        <h4>Top Transactions</h4>
        <table className="top-transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {topTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.id}</td>
                <td>{transaction.customer}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
