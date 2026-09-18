<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string',
            'categorie_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $produit = Produit::create($request->all());

        return response()->json($produit, 201);
    }

    public function update(Request $request, Produit $produit)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string',
            'categorie_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $produit->update($request->all());

        return response()->json($produit);
    }

    public function destroy(Produit $produit)
    {
        $produit->delete();

        return response()->json(['message' => 'Produit supprimé']);
    }
}
