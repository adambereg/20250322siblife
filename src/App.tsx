import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Users, Calendar, MapPin, ShoppingBag, Building2, Newspaper } from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Hero from './components/Hero.tsx';
import UserLevels from './components/UserLevels.tsx';
import FeaturedNews from './components/FeaturedNews.tsx';
import Communities from './components/Communities.tsx';
import FeaturedEvents from './components/FeaturedEvents.tsx';
import CityGuide from './components/CityGuide.tsx';
import MarketplaceSlider from './components/MarketplaceSlider.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import VIPProfilePage from './pages/VIPProfilePage.tsx';
import PROProfilePage from './pages/PROProfilePage.tsx';
import BusinessProfilePage from './pages/BusinessProfilePage.tsx';
import AdminProfilePage from './pages/AdminProfilePage.tsx';
import ClansPage from './pages/ClansPage.tsx';
import ClanDetailsPage from './pages/ClanDetailsPage.tsx';
import NewsPage from './pages/NewsPage.tsx';
import NewsArticlePage from './pages/NewsArticlePage.tsx';
import EventsPage from './pages/EventsPage.tsx';
import EventDetailsPage from './pages/EventDetailsPage.tsx';
import PlacesPage from './pages/PlacesPage.tsx';
import PlaceDetailsPage from './pages/PlaceDetailsPage.tsx';
import MarketplacePage from './pages/MarketplacePage.tsx';
import ProductDetailsPage from './pages/ProductDetailsPage.tsx';
import HousingPage from './pages/HousingPage.tsx';
import HousingDetailsPage from './pages/HousingDetailsPage.tsx';
import ReferralsPage from './pages/ReferralsPage.tsx';

function App() {
  const navigationItems = [
    { icon: Newspaper, label: 'Новости', href: '/news' },
    { icon: Calendar, label: 'События', href: '/events' },
    { icon: Users, label: 'Кланы', href: '/clans' },
    { icon: MapPin, label: 'Места', href: '/places' },
    { icon: ShoppingBag, label: 'Маркетплейс', href: '/marketplace' },
    { icon: Building2, label: 'Жильё', href: '/housing' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar items={navigationItems} />
      <div className="flex-grow">
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/vip-profile" element={<VIPProfilePage />} />
          <Route path="/pro-profile" element={<PROProfilePage />} />
          <Route path="/business-profile" element={<BusinessProfilePage />} />
          <Route path="/admin-profile" element={<AdminProfilePage />} />
          <Route path="/clans" element={<ClansPage />} />
          <Route path="/clans/:clanId" element={<ClanDetailsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:articleId" element={<NewsArticlePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventSlug" element={<EventDetailsPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/places/:placeId" element={<PlaceDetailsPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:productSlug" element={<ProductDetailsPage />} />
          <Route path="/housing" element={<HousingPage />} />
          <Route path="/housing/:housingSlug" element={<HousingDetailsPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route path="/" element={
            <main>
              <Hero />
              <UserLevels />
              <FeaturedNews />
              <Communities />
              <FeaturedEvents />
              <CityGuide />
              <MarketplaceSlider />
            </main>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;