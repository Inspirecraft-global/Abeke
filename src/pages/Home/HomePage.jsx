import Category from '../../components/home/Category';
import HeroSection from '../../components/home/HeroSection';
import Product from '../../components/home/Product';
import Subscibe from '../../components/home/Subscibe';
import Testimonials from '../../components/home/Testimonials';

const HomePage = () => {
  return (
    <div className=" text-black flex flex-col gap-10">
      <HeroSection />
      <Category />
      <Product />
      <Testimonials />
      <Subscibe />
    </div>
  );
};

export default HomePage;
