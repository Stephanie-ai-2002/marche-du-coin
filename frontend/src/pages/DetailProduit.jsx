import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { usePanier } from '../context/PanierContext';

export default function DetailProduit() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [quantite, setQuantite] = useState(1);
  const [erreur, setErreur] = useState('');
  const [message, setMessage] = useState('');
  const { ajouterArticle } = usePanier();

  useEffect(() => {
    api
      .get(`/produits/${id}`)
      .then((res) => setProduit(res.data))
      .catch(() => setErreur('Produit introuvable.'));
  }, [id]);

  const handleAjouter = () => {
    ajouterArticle(produit, quantite);
    setMessage('Produit ajouté au panier !');
  };

  if (erreur) return <p style={{ color: 'var(--terracotta)' }}>{erreur}</p>;
  if (!produit) return <p>Chargement...</p>;

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {produit.image ? (
        <img
          src={produit.image}
          alt={produit.nom}
          loading="lazy"
          width="300"
          height="300"
          style={{ flex: '1 1 300px', minHeight: '300px', maxWidth: '400px', objectFit: 'cover', borderRadius: '8px' }}
        />
      ) : (
        <div
          style={{
            flex: '1 1 300px',
            minHeight: '300px',
            background: '#eee',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
          }}
        >
          IMAGE PRODUIT
        </div>
      )}

      <div style={{ flex: '1 1 300px' }}>
        <h1>{produit.nom}</h1>
        <p><strong>Prix : {produit.prix} FCFA</strong></p>
        <p>{produit.description}</p>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem' }}>
          <span>Qté</span>
          <button
            className="btn-secondaire"
            onClick={() => setQuantite((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max={produit.stock}
            value={quantite}
            onChange={(e) => setQuantite(Number(e.target.value))}
            style={{ width: '50px', textAlign: 'center' }}
          />
          <button
            className="btn-secondaire"
            onClick={() => setQuantite((q) => Math.min(produit.stock, q + 1))}
          >
            +
          </button>
        </div>

        <button className="btn-principal" onClick={handleAjouter} style={{ marginTop: '1rem' }}>
          Ajouter au panier
        </button>

        {message && <p style={{ color: 'var(--vert)', marginTop: '0.5rem' }}>{message}</p>}
      </div>
    </div>
  );
}