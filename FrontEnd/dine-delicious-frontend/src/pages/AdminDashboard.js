import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      alert("Unauthorized!");
      navigate("/unauthorized");
    }
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, Admin!</h2>
      <p>This is your admin dashboard.</p>
    </div>
  );
}

export default AdminDashboard;
