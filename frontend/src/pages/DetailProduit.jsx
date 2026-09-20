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

  if (erreur) return <p style={{ color: 'red' }}>{erreur}</p>;
  if (!produit) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{produit.nom}</h1>
      <p>{produit.description}</p>
      <p><strong>{produit.prix} FCFA</strong></p>
      <p>Catégorie : {produit.categorie?.nom}</p>
      <p>Stock disponible : {produit.stock}</p>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem' }}>
        <input
          type="number"
          min="1"
          max={produit.stock}
          value={quantite}
          onChange={(e) => setQuantite(Number(e.target.value))}
          style={{ width: '60px' }}
        />
        <button onClick={handleAjouter} style={{ backgroundColor: '#E07A5F', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
          Ajouter au panier
        </button>
      </div>

      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}