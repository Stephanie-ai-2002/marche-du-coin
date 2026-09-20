import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Catalogue() {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [categorieId, setCategorieId] = useState('');
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setChargement(true);
    api
      .get('/produits', { params: { recherche, categorie_id: categorieId || undefined } })
      .then((res) => {
        setProduits(res.data.data);
        setErreur('');
      })
      .catch(() => setErreur('Impossible de charger les produits.'))
      .finally(() => setChargement(false));
  }, [recherche, categorieId]);

  return (
    <div>
      <h1>Catalogue</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <select value={categorieId} onChange={(e) => setCategorieId(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nom}</option>
          ))}
        </select>
      </div>

      {chargement && <p>Chargement...</p>}
      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {!chargement && produits.length === 0 && <p>Aucun produit trouvé.</p>}
        {produits.map((produit) => (
          <Link
            key={produit.id}
            to={`/produits/${produit.id}`}
            style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', textDecoration: 'none', color: '#333' }}
          >
            <h3>{produit.nom}</h3>
            <p>{produit.prix} FCFA</p>
          </Link>
        ))}
      </div>
    </div>
  );
}