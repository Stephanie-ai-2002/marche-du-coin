<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommandeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'articles' => ['required', 'array', 'min:1'],
            'articles.*.produit_id' => ['required', 'exists:produits,id'],
            'articles.*.quantite' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'articles.required' => 'Le panier ne peut pas être vide.',
            'articles.min' => 'Le panier ne peut pas être vide.',
            'articles.*.produit_id.required' => 'Un produit du panier est invalide.',
            'articles.*.produit_id.exists' => 'Un produit du panier n\'existe plus.',
            'articles.*.quantite.required' => 'La quantité est obligatoire.',
            'articles.*.quantite.min' => 'La quantité doit être d\'au moins 1.',
        ];
    }
}
