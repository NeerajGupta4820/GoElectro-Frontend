import { Routes, Route, Navigate } from "react-router-dom"; 
import AdminSidebar from "../../Components/admin/sidebar/SideBar";
import Dashboard from "../../Components/admin/dashboard/Dashboard"; 
import Product from "../../Components/admin/product/Product"; 
import Categories from "../../Components/admin/category/Categories"; 
import Customer from "../../Components/admin/customers/Customers"; 
import Transaction from "../../Components/admin/transactions/Transactions"; 
import "./AdminDashboard.css";
import Stopwatch from "../../Components/admin/Apps/StopWatch";
import CoinToss from "../../Components/admin/Apps/Toss";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="dashboard-content">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/*" element={<Product />} /> 
          <Route path="/categories/*" element={<Categories />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/app/stopwatch" element={<Stopwatch />} />
          <Route path="/app/toss" element={<CoinToss />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
