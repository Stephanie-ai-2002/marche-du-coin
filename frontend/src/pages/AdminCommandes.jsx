import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const STATUTS = ['en_attente', 'confirmee', 'livree'];

export default function AdminCommandes() {
  const { user } = useAuth();
  const [commandes, setCommandes] = useState([]);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    api.get('/commandes').then((res) => setCommandes(res.data));
  }, []);

  const handleChangerStatut = async (id, statut) => {
    try {
      const res = await api.put(`/commandes/${id}`, { statut });
      setCommandes(commandes.map((c) => (c.id === id ? res.data : c)));
    } catch (err) {
      setErreur('Mise à jour du statut impossible.');
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>Accès réservé aux administrateurs.</p>;
  }

  return (
    <div>
      <h1>Gestion des commandes</h1>
      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>N°</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.utilisateur?.name}</td>
              <td>{c.date}</td>
              <td>{c.total} FCFA</td>
              <td>
                <select
                  value={c.statut}
                  onChange={(e) => handleChangerStatut(c.id, e.target.value)}
                >
                  {STATUTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}