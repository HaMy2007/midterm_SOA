import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";
const Dashboard = () => {
  return (
    <div className="font-display  bg-section-hero">
      <div className="dashboard grid grid-cols-[20%_80%] gap-3.5 h-screen max-w-7xl mx-auto">
        <aside className="sticky h-full top-0">
          <Sidebar />
        </aside>
        <main className="overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
