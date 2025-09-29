import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

const AdminProtectedRoute = () => {
    const { isAdmin, isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) return <Navigate to={`/`} replace />
    if (!isAdmin) return <Navigate to={`/`} replace />
    return <Outlet />;
}

export default AdminProtectedRoute