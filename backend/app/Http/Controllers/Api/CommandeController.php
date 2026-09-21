<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommandeRequest;
use App\Http\Requests\UpdateCommandeRequest;
use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Produit;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $commandes = Commande::with('lignes.produit', 'utilisateur')->get();
        } else {
            $commandes = Commande::with('lignes.produit')
                ->where('utilisateur_id', $user->id)
                ->get();
        }

        return response()->json($commandes);
    }

    public function store(StoreCommandeRequest $request)
    {
        $articles = $request->validated()['articles'];

        $total = 0;
        foreach ($articles as $article) {
            $produit = Produit::findOrFail($article['produit_id']);
            $total += $produit->prix * $article['quantite'];
        }

        $commande = Commande::create([
            'utilisateur_id' => $request->user()->id,
            'date' => now(),
            'statut' => 'en_attente',
            'total' => $total,
        ]);

        foreach ($articles as $article) {
            $produit = Produit::findOrFail($article['produit_id']);
            LigneCommande::create([
                'commande_id' => $commande->id,
                'produit_id' => $produit->id,
                'quantite' => $article['quantite'],
                'prix_unitaire' => $produit->prix,
            ]);
        }

        return response()->json($commande->load('lignes.produit'), 201);
    }

    public function update(UpdateCommandeRequest $request, Commande $commande)
    {
        $commande->update($request->validated());

        return response()->json($commande);
    }
}
