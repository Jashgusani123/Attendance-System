import Navbar from './Navbar';

interface AdminDashboardProps {
  Component:  React.ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ Component }) => {
  return (
    <div className="flex h-screen bg-zinc-200 min-w-0">

      {/* Sidebar/Navbar */}
      <Navbar />

      {/* Main scrollable area */}
      <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden">
      {Component}
      </div>
    </div>
  );
};

export default AdminDashboard;
