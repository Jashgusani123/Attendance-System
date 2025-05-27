import Navbar from './Navbar';

interface AdminDashboardProps {
  Component: React.ComponentType;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ Component }) => {
  return (
    <div className="flex h-screen bg-zinc-200 overflow-hidden">
      {/* Sidebar/Navbar */}
      <Navbar />

      {/* Main Component */}
      <div className="flex-1 overflow-y-auto">
        <Component />
      </div>
    </div>
  );
};

export default AdminDashboard;
