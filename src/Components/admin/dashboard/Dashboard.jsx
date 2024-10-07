import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>
      
      <section className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Total Sales</h2>
          <p>$25,000</p>
        </div>
        <div className="dashboard-card">
          <h2>New Customers</h2>
          <p>150</p>
        </div>
        <div className="dashboard-card">
          <h2>Products Sold</h2>
          <p>1,200</p>
        </div>
        <div className="dashboard-card">
          <h2>Revenue</h2>
          <p>$50,000</p>
        </div>
      </section>
      
      <section className="dashboard-charts">
        <div className="chart">
          <h2>Sales Chart</h2>
          {/* Add chart component or visualization here */}
          <p>Placeholder for sales chart</p>
        </div>
        <div className="chart">
          <h2>Customer Growth</h2>
          {/* Add chart component or visualization here */}
          <p>Placeholder for customer growth chart</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
