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
    <div className="catalogue-layout">
      <aside className="catalogue-sidebar">
        <input
          type="text"
          placeholder="Recherche..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          style={{ width: '100%', boxSizing: 'border-box', marginBottom: '1rem' }}
        />

        <h2 style={{ fontSize: '1.1rem' }}>Catégories</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            className={categorieId === '' ? 'btn-principal' : 'btn-secondaire'}
            onClick={() => setCategorieId('')}
          >
            Toutes
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={categorieId === String(cat.id) ? 'btn-principal' : 'btn-secondaire'}
              onClick={() => setCategorieId(String(cat.id))}
            >
              {cat.nom}
            </button>
          ))}
        </div>
      </aside>

      <div style={{ flex: 1 }}>
        <h2>Catalogue des produits ({produits.length} résultats)</h2>

        {chargement && <p>Chargement...</p>}
        {erreur && <p style={{ color: 'var(--terracotta)' }}>{erreur}</p>}
        {!chargement && produits.length === 0 && <p>Aucun produit trouvé.</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {produits.map((produit) => (
            <Link
              key={produit.id}
              to={`/produits/${produit.id}`}
              style={{
                border: '1px solid var(--vert)',
                borderRadius: '8px',
                padding: '1rem',
                textDecoration: 'none',
                color: 'var(--gris)',
              }}
            >
              {produit.image ? (
                <img
                  src={produit.image}
                  alt={produit.nom}
                  loading="lazy"
                  width="200"
                  height="120"
                  style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }}
                />
              ) : (
                <div
                  style={{
                    background: '#eee',
                    borderRadius: '4px',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    marginBottom: '0.5rem',
                  }}
                >
                  IMG
                </div>
              )}
              <h3>{produit.nom}</h3>
              <p>{produit.prix} FCFA</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}