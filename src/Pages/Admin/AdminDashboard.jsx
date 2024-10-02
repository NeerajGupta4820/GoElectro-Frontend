import { Routes, Route } from "react-router-dom"; 
import AdminSidebar from "../../Components/admin/SideBar";
import Dashboard from "../../Components/admin/Dashboard"; 
import Product from "../../Components/admin/product/Product"; 
import Categories from "../../Components/admin/category/Categories"; 
import Customer from "../../Components/admin/customers/Customers"; 
import Transaction from "../../Components/admin/transactions/Transactions"; 
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="dashboard-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/product" element={<Product />} />
          <Route path="/dashboard/categories" element={<Categories />} />
          <Route path="/dashboard/customer" element={<Customer />} />
          <Route path="/dashboard/transaction" element={<Transaction />} />
          <Route
            path="*"
            element={
              <section className="content-section">
                <h2>Welcome to the Admin Dashboard</h2>
                <p>Select an option from the sidebar to see the content.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
