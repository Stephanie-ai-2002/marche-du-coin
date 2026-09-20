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
        <h1>Panier</h1>
        <p>Votre panier est vide.</p>
        <Link to="/catalogue">Voir le catalogue</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Panier</h1>
      {articles.map((a) => (
        <div key={a.produit.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '0.5rem 0' }}>
          <span>{a.produit.nom}</span>
          <input
            type="number"
            min="1"
            value={a.quantite}
            onChange={(e) => modifierQuantite(a.produit.id, Number(e.target.value))}
            style={{ width: '50px' }}
          />
          <span>{a.produit.prix * a.quantite} FCFA</span>
          <button onClick={() => retirerArticle(a.produit.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
            Retirer
          </button>
        </div>
      ))}

      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Total : {total} FCFA</p>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      <button onClick={handleCommander} style={{ backgroundColor: '#2F5233', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer' }}>
        Valider la commande
      </button>
    </div>
  );
}