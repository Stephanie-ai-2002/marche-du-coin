import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PanierProvider } from './context/PanierContext';
import Accueil from './pages/Accueil';
import Catalogue from './pages/Catalogue';
import DetailProduit from './pages/DetailProduit';
import Panier from './pages/Panier';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import MesCommandes from './pages/MesCommandes';
import AdminProduits from './pages/AdminProduits';

function App() {
  return (
    <AuthProvider>
      <PanierProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/produits/:id" element={<DetailProduit />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/login" element={<Connexion />} />
            <Route path="/register" element={<Inscription />} />
            <Route path="/mes-commandes" element={<MesCommandes />} />
            <Route path="/admin" element={<AdminProduits />} />
          </Routes>
        </BrowserRouter>
      </PanierProvider>
    </AuthProvider>
  );
}

export default App;