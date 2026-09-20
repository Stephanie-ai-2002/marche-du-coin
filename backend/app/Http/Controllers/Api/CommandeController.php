<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'articles' => 'required|array|min:1',
            'articles.*.produit_id' => 'required|exists:produits,id',
            'articles.*.quantite' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $total = 0;
        foreach ($request->articles as $article) {
            $produit = Produit::findOrFail($article['produit_id']);
            $total += $produit->prix * $article['quantite'];
        }

        $commande = Commande::create([
            'utilisateur_id' => $request->user()->id,
            'date' => now(),
            'statut' => 'en_attente',
            'total' => $total,
        ]);

        foreach ($request->articles as $article) {
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

    public function update(Request $request, Commande $commande)
    {
        $validator = Validator::make($request->all(), [
            'statut' => 'required|string|in:en_attente,confirmee,livree',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $commande->update(['statut' => $request->statut]);

        return response()->json($commande);
    }
}
