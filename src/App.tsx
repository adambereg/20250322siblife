import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Компоненты
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import UserLevels from './components/UserLevels';
import FeaturedNews from './components/FeaturedNews';
import Communities from './components/Communities';
import FeaturedEvents from './components/FeaturedEvents';
import CityGuide from './components/CityGuide';
import MarketplaceSlider from './components/MarketplaceSlider';

// Страницы
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RolesPage from './pages/RolesPage';
import ProfilePage from './pages/ProfilePage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import VIPProfilePage from './pages/VIPProfilePage';
import PROProfilePage from './pages/PROProfilePage';
import BusinessProfilePage from './pages/BusinessProfilePage';
import AdminProfilePage from './pages/AdminProfilePage';
import ClansPage from './pages/ClansPage';
import ClanDetailsPage from './pages/ClanDetailsPage';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import PlacesPage from './pages/PlacesPage';
import PlaceDetailsPage from './pages/PlaceDetailsPage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import HousingPage from './pages/HousingPage';
import HousingDetailsPage from './pages/HousingDetailsPage';
import ReferralsPage from './pages/ReferralsPage';

// Иконки
import { Users, Calendar, MapPin, ShoppingBag, Building2, Newspaper } from 'lucide-react';

// Компонент layout'а с навбаром и футером
const MainLayout = () => {
  const navigationItems = [
    { icon: Newspaper, label: 'Новости', href: '/news' },
    { icon: Users, label: 'Кланы', href: '/clans' },
    { icon: Calendar, label: 'События', href: '/events' },
    { icon: MapPin, label: 'Места', href: '/places' },
    { icon: ShoppingBag, label: 'Маркет', href: '/marketplace' },
    { icon: Building2, label: 'Жилье', href: '/housing' },
  ];

  return (
    <>
      <Navbar items={navigationItems} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

// Компонент главной страницы
const HomePage = () => (
  <main>
    <Hero />
    <UserLevels />
    <FeaturedNews />
    <Communities />
    <FeaturedEvents />
    <CityGuide />
    <MarketplaceSlider />
  </main>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Публичные маршруты без навбара */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        
        {/* Маршруты с навбаром и футером */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventSlug" element={<EventDetailsPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/places/:placeId" element={<PlaceDetailsPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:productSlug" element={<ProductDetailsPage />} />
          <Route path="/housing" element={<HousingPage />} />
          <Route path="/housing/:housingSlug" element={<HousingDetailsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:articleId" element={<NewsArticlePage />} />
          <Route path="/clans" element={<ClansPage />} />
          <Route path="/clans/:clanId" element={<ClanDetailsPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          
          {/* Защищенные маршруты */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
          <Route element={<PrivateRoute allowedRoles={['vip', 'pro', 'admin']} />}>
            <Route path="/vip-profile" element={<VIPProfilePage />} />
          </Route>
          
          <Route element={<PrivateRoute allowedRoles={['pro', 'admin']} />}>
            <Route path="/pro-profile" element={<PROProfilePage />} />
          </Route>
          
          <Route element={<PrivateRoute allowedRoles={['business', 'admin']} />}>
            <Route path="/business-profile" element={<BusinessProfilePage />} />
          </Route>
          
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin-profile" element={<AdminProfilePage />} />
          </Route>
        </Route>

        {/* Редирект для неизвестных маршрутов */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;