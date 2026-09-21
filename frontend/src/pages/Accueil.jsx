import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Accueil() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    api.get('/produits').then((res) => setProduits(res.data.data.slice(0, 4)));
  }, []);

  return (
    <div>
      <div
        style={{
          background: 'var(--vert)',
          color: '#fff',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ color: '#fff', margin: 0 }}>Bienvenue sur Marché du Coin</h1>
        <p style={{ marginTop: '0.5rem' }}>Vos produits locaux à portée de clic</p>
      </div>

      <h2>Produits en vedette</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {produits.map((produit) => (
          <div
            key={produit.id}
            style={{ border: '1px solid var(--vert)', borderRadius: '8px', padding: '1rem' }}
          >
            {produit.image ? (
              <img
                src={produit.image}
                alt={produit.nom}
                loading="lazy"
                width="220"
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
            <h3 style={{ margin: '0 0 0.25rem' }}>{produit.nom}</h3>
            <p style={{ margin: '0 0 0.75rem' }}>{produit.prix} FCFA</p>
            <Link to={`/produits/${produit.id}`} className="btn-secondaire" style={{ display: 'block', textAlign: 'center' }}>
              Voir
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}