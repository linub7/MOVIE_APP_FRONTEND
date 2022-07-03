import AdminDashboardComponent from '../AdminDashboardComponent';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminDashboardComponent />
      <div className="flex-1 p-2 max-w-screen-xl">{children}</div>
    </div>
  );
};

export default AdminLayout;
