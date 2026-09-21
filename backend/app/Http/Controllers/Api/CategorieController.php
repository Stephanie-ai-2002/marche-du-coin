<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Models\Categorie;

class CategorieController extends Controller
{
    public function index()
    {
        return response()->json(Categorie::all());
    }

    public function store(StoreCategorieRequest $request)
    {
        $categorie = Categorie::create($request->validated());

        return response()->json($categorie, 201);
    }

    public function update(UpdateCategorieRequest $request, Categorie $categorie)
    {
        $categorie->update($request->validated());

        return response()->json($categorie);
    }

    public function destroy(Categorie $categorie)
    {
        $categorie->delete();

        return response()->json(['message' => 'Catégorie supprimée']);
    }
}
