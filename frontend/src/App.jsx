import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PanierProvider } from './context/PanierContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import RouteProtegee from './components/RouteProtegee';
import Accueil from './pages/Accueil';
import Catalogue from './pages/Catalogue';
import DetailProduit from './pages/DetailProduit';
import Panier from './pages/Panier';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import MesCommandes from './pages/MesCommandes';
import Profil from './pages/Profil';
import AdminProduits from './pages/AdminProduits';
import AdminCategories from './pages/AdminCategories';
import AdminCommandes from './pages/AdminCommandes';

function AppLayout() {
  const location = useLocation();
  const estAdmin = location.pathname.startsWith('/admin');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!estAdmin && <Header />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/produits/:id" element={<DetailProduit />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/login" element={<Connexion />} />
          <Route path="/register" element={<Inscription />} />
          <Route path="/mes-commandes" element={<MesCommandes />} />
          <Route
            path="/profil"
            element={
              <RouteProtegee adminSeulement={false}>
                <Profil />
              </RouteProtegee>
            }
          />

          <Route
            path="/admin"
            element={
              <RouteProtegee>
                <AdminLayout />
              </RouteProtegee>
            }
          >
            <Route index element={<AdminProduits />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="commandes" element={<AdminCommandes />} />
          </Route>
        </Routes>
      </main>
      {!estAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PanierProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </PanierProvider>
    </AuthProvider>
  );
}

export default App;