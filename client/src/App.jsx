import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoginPage from './LoginPage';
import FunnelBoard from './FunnelBoard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Card from './components/Card';
import DashboardGrid from './components/DashboardGrid';
import Breadcrumb from './components/Breadcrumb';
import StatCard from './components/StatCard';
import RevenueChart from './components/RevenueChart';
import ProgramDistributionChart from './components/ProgramDistributionChart';
import QuickStats from './components/QuickStats';
import ActivityTimeline from './components/ActivityTimeline';
import DataTable from './components/DataTable';
import Button from './components/Button';
import Input from './components/Input';
import useThemeStore from './stores/themeStore';
import Settings from './components/Settings';
import ProjectsView from './components/ProjectsView';
import useCustomerStore from './stores/customerStore';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';

// ... (other imports)

const Dashboard = () => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const { theme } = useThemeStore();

  const { customers, fetchCustomers, addCustomer } = useCustomerStore();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [notification, setNotification] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedCustomer(null);
  };

  const renderContent = () => {
    if (selectedCustomer && currentView === 'dashboard') {
      // Eğer dashboard'da müşteri seçiliyse detay göster
      return <CustomerDetail customer={selectedCustomer} onClearSelection={() => setSelectedCustomer(null)} theme={theme} />;
    }

    // Eğer projeler sayfasından bir projeye tıklandıysa ve müşteri seçimi yapılması gerekiyorsa:
    // Şu an ProjectsView onProjectClick yok, ama eklersek buradan yönlendirilebilir.
    // Şimdilik basit tutalım.

    switch (currentView) {
      case 'funnel':
        return <FunnelBoard theme={theme} onCustomerClick={setSelectedCustomer} />;
      case 'settings':
        return <Settings />;
      case 'projects':
        return <ProjectsView theme={theme} onProjectClick={(p) => {
          // Projeye tıklanınca o müşterinin detayına git
          const customer = customers.find(c => c.id === p.customerId);
          if (customer) {
            setSelectedCustomer(customer);
            setCurrentView('dashboard'); // Detay görünümü dashboard içinde
            // Opsiyonel: Tab'ı 'projeler' yap (CustomerDetail prop'u gerekebilir)
          }
        }} />;
      case 'customers':
        return (
          <Card>
            <Card.Header title="Tüm Müşteriler" icon="👥" />
            <Card.Body>
              <CustomerList
                selectedCustomer={selectedCustomer}
                onCustomerSelect={setSelectedCustomer}
                theme={theme}
              />
            </Card.Body>
          </Card>
        );
      case 'dashboard':
      default:
        // ... (dashboard content)

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Stats Grid */}
            {/* Stats Grid - Updated to match Reference Design */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', // 4 Column fixed layout like screenshot
              gap: '24px'
            }}>
              <StatCard
                title="Toplam Müşteri"
                value={customers.length}
                icon="👥"
                trend="+12%"
                trendDirection="up"
                type="primary" // Blue
                subText="bu ay"
                theme={theme}
              />
              <StatCard
                title="CRM Hedefi"
                value={`${customers.filter(c => c.durum === 'hedef').length} / 10`}
                icon="🎯"
                trend="↓ 0%"
                trendDirection="down"
                type="success" // Green
                subText="hedef başarı"
                theme={theme}
              />
              <StatCard
                title="Aktif Müşteriler"
                value={customers.filter(c => c.durum === 'aktif').length}
                icon="📊" // Chart icon
                trend="↑ 8%"
                trendDirection="up"
                type="secondary" // Purple (mapped in StatCard usually)
                subText="potansiyelden"
                theme={theme}
              />
              <StatCard
                title="Geciken Alacak"
                value={new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(customers.reduce((sum, c) => sum + (c.cariDurum?.gecmisBorc || 0), 0))}
                icon="💰"
                trend="↓ %5"
                trendDirection="down"
                type="danger" // Red
                subText="kritik"
                theme={theme}
              />
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
              <Card>
                <Card.Header title="Müşteri Listesi" icon="👥" />
                <Card.Body>
                  <CustomerList
                    selectedCustomer={selectedCustomer}
                    onCustomerSelect={setSelectedCustomer}
                    theme={theme}
                  />
                </Card.Body>
              </Card>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Card>
                  <Card.Header title="Hızlı İşlemler" icon="⚡" />
                  <Card.Body>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      <Button fullWidth onClick={() => { }}>➕ Yeni Müşteri Ekle</Button>
                      <Button variant="secondary" fullWidth>📄 Rapor Oluştur</Button>
                      <Button variant="secondary" fullWidth>📅 Takvim Görüntüle</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: theme.background.main, fontFamily: "'Segoe UI', Tahoma, sans-serif", color: theme.text.primary, transition: 'background 0.3s ease' }}>
      <Sidebar activeView={currentView} onViewChange={handleViewChange} isAdmin={isAdmin} theme={theme} />
      <div style={{ flex: 1, marginLeft: sidebarCollapsed ? theme.layout.sidebarCollapsedWidth : theme.layout.sidebarWidth, transition: `margin-left ${theme.transition.slow}` }}>
        <Header user={user} onLogout={logout} onAddCustomer={() => { /* Modal logic to be handled elsewhere */ }} theme={theme} />
        <main style={{ marginTop: theme.layout.headerHeight, padding: theme.spacing['3xl'] }}>
          <Breadcrumb items={[{ label: 'Ana Sayfa' }, { label: currentView }]} theme={theme} />
          <div style={{ marginTop: '20px' }}>
            {renderContent()}
          </div>
        </main>
      </div>
      {notification && <div style={{ position: 'fixed', top: 20, right: 20, /* ... */ }}>{notification.message}</div>}
    </div>
  );
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Yükleniyor...</div>; // veya bir spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
