import { Link, useNavigate } from 'react-router-dom';
import { usePanier } from '../context/PanierContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { useState } from 'react';

export default function Panier() {
  const { articles, retirerArticle, modifierQuantite, viderPanier, total } = usePanier();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [erreur, setErreur] = useState('');

  const handleCommander = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/commandes', {
        articles: articles.map((a) => ({ produit_id: a.produit.id, quantite: a.quantite })),
      });
      viderPanier();
      navigate('/mes-commandes');
    } catch (err) {
      setErreur('Impossible de valider la commande. Vérifiez le stock disponible.');
    }
  };

  if (articles.length === 0) {
    return (
      <div>
        <h1>Mon panier</h1>
        <p>Votre panier est vide.</p>
        <Link to="/catalogue">Voir le catalogue</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Mon panier</h1>

      {articles.map((a) => (
        <div
          key={a.produit.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            border: '1px solid var(--vert)',
            borderRadius: '8px',
            padding: '0.75rem',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              flexShrink: 0,
              background: '#eee',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              fontSize: '0.7rem',
            }}
          >
            IMG
          </div>

          <span style={{ flex: 1, textAlign: 'left' }}>{a.produit.nom}</span>

          <label>
            Qté{' '}
            <input
              type="number"
              min="1"
              value={a.quantite}
              onChange={(e) => modifierQuantite(a.produit.id, Number(e.target.value))}
              style={{ width: '50px' }}
            />
          </label>

          <span style={{ width: '100px', textAlign: 'right' }}>{a.produit.prix * a.quantite} FCFA</span>

          <button className="btn-secondaire" onClick={() => retirerArticle(a.produit.id)}>
            Retirer
          </button>
        </div>
      ))}

      <div
        style={{
          borderTop: '1px solid var(--vert)',
          marginTop: '1rem',
          paddingTop: '1rem',
          textAlign: 'right',
          fontWeight: 'bold',
        }}
      >
        Total : {total} FCFA
      </div>

      {erreur && <p style={{ color: 'var(--terracotta)' }}>{erreur}</p>}

      <div style={{ textAlign: 'right', marginTop: '1rem' }}>
        <button className="btn-principal" onClick={handleCommander}>
          Valider la commande
        </button>
      </div>
    </div>
  );
}