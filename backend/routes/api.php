<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\CommandeController;
use App\Http\Controllers\Api\ProduitController;
use Illuminate\Support\Facades\Route;

// Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Produits (lecture publique, écriture protégée et réservée à l'admin)
Route::get('/produits', [ProduitController::class, 'index']);
Route::get('/produits/{produit}', [ProduitController::class, 'show']);
Route::middleware(['auth:sanctum', 'est_admin'])->group(function () {
    Route::post('/produits', [ProduitController::class, 'store']);
    Route::put('/produits/{produit}', [ProduitController::class, 'update']);
    Route::delete('/produits/{produit}', [ProduitController::class, 'destroy']);
});

// Catégories
Route::get('/categories', [CategorieController::class, 'index']);
Route::middleware(['auth:sanctum', 'est_admin'])->group(function () {
    Route::post('/categories', [CategorieController::class, 'store']);
    Route::put('/categories/{categorie}', [CategorieController::class, 'update']);
    Route::delete('/categories/{categorie}', [CategorieController::class, 'destroy']);
});

// Commandes (creation par le client connecté, consultation par le client ou l'admin)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/commandes', [CommandeController::class, 'store']);
    Route::get('/commandes', [CommandeController::class, 'index']);
});

// Mise a jour du statut d'une commande, reservee a l'admin
Route::middleware(['auth:sanctum', 'est_admin'])->group(function () {
    Route::put('/commandes/{commande}', [CommandeController::class, 'update']);
});
