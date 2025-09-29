import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/header/Navbar';
import {
  DashboardIcon,
  FormIcon,
  HomeIcon,
  LoadingIcon,
  LogoutIcon,
} from '../icons';
import ProgressBar from '../components/others/ProgressBar';
import { ScrollToTop } from '../components/others/ScrollToTop';
import { useLogout } from '../hooks/queries/auth.query';
import { useAuthStore } from '../store/auth.store';
import Advert from './Advert';
import { useState } from 'react';
import Footer from './Footer';

const LayoutContent = () => {
  const { mutate, isPending } = useLogout();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [advert, setAdvert] = useState(true);

  return (
    <div
      className={`max-w-[1940px] font-spectral text-black mx-auto shadow-card h-full`}
    >
      <div className="flex flex-col ">
        <div className="flex flex-col w-full">
          <div>
            {advert && <Advert />}
            <Navbar title="Home" />
            <div className="">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeLayout = () => {
  return (
    <>
      <ProgressBar />
      <ScrollToTop />
      <LayoutContent />
    </>
  );
};

export default HomeLayout;
