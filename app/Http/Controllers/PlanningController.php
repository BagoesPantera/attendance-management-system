<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanningController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'admin') {
            $plannings = Planning::with('user')->latest()->paginate(20);
        } else {
            $plannings = $user->plannings()->latest()->paginate(20);
        }
        return Inertia::render('planning/index', ['plannings' => $plannings]);
    }

    public function create()
    {
        return Inertia::render('planning/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'planned_start' => 'required',
            'planned_end' => 'required',
        ]);

        $user = $request->user();

        $planning = Planning::updateOrCreate(
            ['user_id' => $user->id, 'date' => $request->date],
            [
                'planned_start' => $request->planned_start,
                'planned_end' => $request->planned_end,
                'note' => $request->note,
            ]
        );

        return response()->json($planning, 201);
    }
}
