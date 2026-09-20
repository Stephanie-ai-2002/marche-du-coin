import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    api
      .get('/commandes')
      .then((res) => setCommandes(res.data))
      .catch(() => setErreur('Impossible de charger vos commandes. Connectez-vous.'))
      .finally(() => setChargement(false));
  }, []);

  if (chargement) return <p>Chargement...</p>;
  if (erreur) return <p style={{ color: 'red' }}>{erreur}</p>;

  return (
    <div>
      <h1>Mes commandes</h1>
      {commandes.length === 0 && <p>Aucune commande passée pour le moment.</p>}
      {commandes.map((commande) => (
        <div key={commande.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Commande #{commande.id}</strong> — {commande.statut}</p>
          <p>Date : {commande.date}</p>
          <p>Total : {commande.total} FCFA</p>
          <ul>
            {commande.lignes?.map((ligne) => (
              <li key={ligne.id}>{ligne.produit?.nom} × {ligne.quantite}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}