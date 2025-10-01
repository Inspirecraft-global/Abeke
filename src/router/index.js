// homepage
import HomeLayout from '../layout/HomeLayout';
import NotfoundPage from '../pages/Error/NotfoundPage';
import LoginPage from '../pages/Home/Auth/LoginPage';

// dashboard
import AppLayout from '../layout/AppLayout';
import HomePage from '../pages/Home/HomePage';
import ProductsPage from '../pages/Home/ProductsPage';
import ProductDetailPage from '../pages/Home/ProductDetailPage';
import CartPage from '../pages/Home/CartPage';
import AdminProtectedRoute from '../layout/Protected/AdminProtectedRoute';
import ProtectedRoute from '../layout/Protected/ProtectedRoute';

const AppRoutes = [
  // Public Home Routes
  {
    path: '/',
    Component: HomeLayout,
    children: [
      { index: true, Component: HomePage },
      { path: '/products', Component: ProductsPage },
      { path: '/products/:id', Component: ProductDetailPage },
      { path: '/cart', Component: CartPage },
      { path: 'login', Component: LoginPage },
    ],
  },
  {
    path: '/dashboard',
    Component: ProtectedRoute,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            // Regular dashboard protected routes
            Component: ProtectedRoute,
            children: [
              /* 
              { index: true, Component: DashboardPage },
              { path: 'attendance', Component: AttendancePage },
              { path: 'profile', Component: UserProfilePage },
              { path: 'events', Component: EventsPage },
              */
            ],
          },
          {
            // Admin-only protected routes
            Component: AdminProtectedRoute,
            children: [
              /*  { path: 'admin', Component: AdminDashboardPage },
              { path: 'admin/attendance', Component: AdminAttendancePage },
              { path: 'admin/first-timers', Component: AdminFirstTimerPage },
              { path: 'admin/members', Component: AdminMembersPage },
              { path: 'admin/forms', Component: AdminFormsPage },
              {
                path: 'admin/units-and-leaders',
                Component: AdminUnitAndLeaderPage,
              }, */
            ],
          },
        ],
      },
    ],
  },
  // 404 Page
  { path: '*', Component: NotfoundPage },
];

export default AppRoutes;
