import AdminDashboardComponent from '../AdminDashboardComponent';
import AdminNavbar from '../AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex dark:bg-primary bg-white dark:text-white text-light-subtle">
      <AdminDashboardComponent />

      <div className="flex-1 p-2 max-w-screen-xl">
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
