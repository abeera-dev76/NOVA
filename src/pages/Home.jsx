import React from 'react';
import HeroSection from '../components/common/HeroSection';
import FeaturedCategories from '../components/product/FeaturedCategories';
import TrendingProducts from '../components/product/TrendingProducts';
import SpecialOffersBanner from '../components/common/SpecialOffersBanner';
import WhyChooseNova from '../components/common/WhyChooseNova';
import CustomerTestimonials from '../components/common/CustomerTestimonials';
import NewsletterSection from '../components/common/NewsletterSection';

const Home = () => {
  return (
    <div className="w-full bg-[#070709] text-white selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* 1. Large Premium Hero Section with 3D Canvas */}
      <HeroSection />

      {/* 2. Featured Categories Grid */}
      <FeaturedCategories />

      {/* 3. Trending Products with Category Filter Tabs */}
      <TrendingProducts />

      {/* 4. Special Offers Cyber Drop Banner with Countdown */}
      <SpecialOffersBanner />

      {/* 5. Why Choose NOVA - 6 Key Pillars */}
      <WhyChooseNova />

      {/* 6. Customer Testimonials with Ratings & Verified Badges */}
      <CustomerTestimonials />

      {/* 7. Newsletter Subscription with Interactive Form */}
      <NewsletterSection />
    </div>
  );
};

export default Home;
