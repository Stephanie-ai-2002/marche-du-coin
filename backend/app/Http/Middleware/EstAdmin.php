<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EstAdmin
{
    /**
     * Vérifie que l'utilisateur authentifié a le rôle admin.
     * A utiliser après le middleware auth:sanctum sur les routes protégées.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Accès refusé : réservé aux administrateurs.',
            ], 403);
        }

        return $next($request);
    }
}
