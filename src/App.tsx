import React from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AvatarSettingsPage from './pages/AvatarSettingsPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import VIPProfilePage from './pages/VIPProfilePage';
import PROProfilePage from './pages/PROProfilePage';
import BusinessProfilePage from './pages/BusinessProfilePage';
import BusinessProfileEditPage from './pages/BusinessProfileEditPage';
import AdminProfilePage from './pages/AdminProfilePage';
import ClansPage from './pages/ClansPage';
import ClanPage from './pages/ClanPage';
import CreateClanPage from './pages/CreateClanPage';
import EditClanPage from './pages/EditClanPage';
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
import BusinessPartnerRegistration from './pages/BusinessPartnerRegistration';
import VerificationPending from './pages/VerificationPending';
import EmailVerification from './pages/EmailVerification';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import BusinessDashboardPage from './pages/BusinessDashboardPage';

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

// Редирект на соответствующую страницу профиля в зависимости от роли пользователя
const ProfileRedirect: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { user } = authState;

  React.useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'business':
          navigate('/business-profile');
          break;
        case 'admin':
          navigate('/admin-profile');
          break;
        case 'vip':
          navigate('/vip-profile');
          break;
        case 'pro':
          navigate('/pro-profile');
          break;
        default:
          navigate('/profile');
      }
    }
  }, [user, navigate]);

  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Публичные маршруты без навбара */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route path="/business-register" element={<BusinessPartnerRegistration />} />
        <Route path="/verification-pending" element={<VerificationPending />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Редирект на соответствующую страницу профиля */}
        <Route 
          path="/profile-redirect" 
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          } 
        >
          <Route index element={<ProfileRedirect />} />
        </Route>
        
        {/* Маршруты с навбаром и футером */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          
          {/* Защищенные маршруты */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/settings" element={<ProfileSettingsPage />} />
            <Route path="/profile/settings/password" element={<ChangePasswordPage />} />
            <Route path="/profile/settings/avatar" element={<AvatarSettingsPage />} />
          </Route>
          
          <Route element={<PrivateRoute allowedRoles={['vip', 'pro', 'admin']} />}>
            <Route path="/vip-profile" element={<VIPProfilePage />} />
          </Route>
          
          <Route element={<PrivateRoute allowedRoles={['pro', 'admin']} />}>
            <Route path="/pro-profile" element={<PROProfilePage />} />
          </Route>
          
          <Route element={<PrivateRoute allowedRoles={['business', 'admin']} />}>
            <Route path="/business-profile" element={<BusinessProfilePage />} />
            <Route path="/business-profile/edit" element={<BusinessProfileEditPage />} />
          </Route>
          
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin-profile" element={<AdminProfilePage />} />
          </Route>

          {/* Другие маршруты с навбаром */}
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
          <Route path="/clans/create" element={
            <PrivateRoute allowedRoles={['pro', 'admin']}>
              <CreateClanPage />
            </PrivateRoute>
          } />
          <Route path="/clans/:id/edit" element={
            <PrivateRoute allowedRoles={['pro', 'admin']}>
              <EditClanPage />
            </PrivateRoute>
          } />
          <Route path="/clans/:id" element={<ClanPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route
            path="/business-dashboard"
            element={
              <PrivateRoute allowedRoles={['business', 'admin']}>
                <BusinessDashboardPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Редирект для неизвестных маршрутов */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;