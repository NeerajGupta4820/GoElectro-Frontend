import AdminSidebar from "../../Components/admin/SideBar";
import "./AdminDashboard.css"; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="dashboard-content">
        <section className="content-section">
          <h2>Welcome to the Admin Dashboard</h2>
          <p>This is the admin dashboard content.</p>
          <p>This is the admin dashboard content.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus varius felis et felis gravida, eu efficitur lorem lacinia. Praesent et ante non purus placerat sodales. Sed ut justo id nunc gravida malesuada a a lacus.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus varius felis et felis gravida, eu efficitur lorem lacinia. Praesent et ante non purus placerat sodales. Sed ut justo id nunc gravida malesuada a a lacus.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Phasellus varius felis et felis gravida, eu efficitur lorem lacinia. Praesent et ante non purus placerat sodales. Sed ut justo id nunc gravida malesuada a a lacus.</p>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
