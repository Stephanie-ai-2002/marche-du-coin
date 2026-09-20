import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PanierProvider } from './context/PanierContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil';
import Catalogue from './pages/Catalogue';
import DetailProduit from './pages/DetailProduit';
import Panier from './pages/Panier';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import MesCommandes from './pages/MesCommandes';
import AdminProduits from './pages/AdminProduits';
import AdminCommandes from './pages/AdminCommandes';

function App() {
  return (
    <AuthProvider>
      <PanierProvider>
        <BrowserRouter>
          <Header />
          <main style={{ minHeight: '70vh', padding: '1rem 2rem' }}>
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/produits/:id" element={<DetailProduit />} />
              <Route path="/panier" element={<Panier />} />
              <Route path="/login" element={<Connexion />} />
              <Route path="/register" element={<Inscription />} />
              <Route path="/mes-commandes" element={<MesCommandes />} />
              <Route path="/admin" element={<AdminProduits />} />
              <Route path="/admin/commandes" element={<AdminCommandes />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </PanierProvider>
    </AuthProvider>
  );
}

export default App;