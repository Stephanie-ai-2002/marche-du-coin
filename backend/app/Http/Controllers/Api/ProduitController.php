<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;
use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        $produits = Produit::with('categorie')
            ->when($request->categorie_id, function ($query, $categorieId) {
                return $query->where('categorie_id', $categorieId);
            })
            ->when($request->recherche, function ($query, $recherche) {
                return $query->where('nom', 'like', "%{$recherche}%");
            })
            ->paginate(12);

        return response()->json($produits);
    }

    public function show(Produit $produit)
    {
        return response()->json($produit->load('categorie'));
    }

    public function store(StoreProduitRequest $request)
    {
        $produit = Produit::create($request->validated());

        return response()->json($produit, 201);
    }

    public function update(UpdateProduitRequest $request, Produit $produit)
    {
        $produit->update($request->validated());

        return response()->json($produit);
    }

    public function destroy(Produit $produit)
    {
        $produit->delete();

        return response()->json(['message' => 'Produit supprimé']);
    }
}
