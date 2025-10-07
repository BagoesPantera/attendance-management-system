<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlanningRequest;
use App\Http\Requests\UpdatePlanningRequest;
use App\Models\Planning;
use App\Models\Shift;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PlanningController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $plannings = Planning::with(['user', 'shift'])->where('user_id', Auth::id())->whereDate('date', '>=', Carbon::today())->orderBy('date')->get();
        return Inertia::render('planning/index', compact('plannings'));
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        $shifts = Shift::all();
        return Inertia::render('planning/create', compact('shifts'));
    }

    /**
     * @param StorePlanningRequest $request
     * @return RedirectResponse
     */
    public function store(StorePlanningRequest $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                Planning::create([
                    'user_id' => Auth::id(),
                    'shift_id' => $request->shift_id,
                    'date' => $request->date,
                    'note' => $request->note
                ]);
            });
            return redirect()->route('planning.index')->with('success', 'Planning created successfully!');
        } catch (\Exception $e) {
            if (str_contains($e->getMessage(), 'SQLSTATE')) {
                return redirect()->back()->withErrors(['msg' => 'GAGAL! Coba lagi']);
            }

            return redirect()->back()->withErrors(['msg' => 'Gagal: ' . $e->getMessage()]);
        }
    }

    /**
     * @param Planning $planning
     * @return Response|RedirectResponse
     */
    public function edit(Planning $planning): Response|RedirectResponse
    {
        if ($planning->user_id !== Auth::id()) {
            return redirect()->route('planning.index');
        }

        $shifts = Shift::all();

        return Inertia::render('planning/edit', [
            'planning' => [
                'id' => $planning->id,
                'date' => $planning->date->format('Y-m-d'),
                'shift_id' => $planning->shift_id,
                'note' => $planning->note,
            ],
            'shifts' => $shifts
        ]);
    }

    /**
     * @param UpdatePlanningRequest $request
     * @param Planning $planning
     * @return RedirectResponse
     */
    public function update(UpdatePlanningRequest $request, Planning $planning): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $planning) {
                $planning->update([
                    'shift_id' => $request->shift_id,
                    'date' => $request->date,
                    'note' => $request->note
                ]);
            });
            return redirect()->route('planning.index')->with('success', 'Planning updated successfully!');
        } catch (\Exception $e) {
            if (str_contains($e->getMessage(), 'SQLSTATE')) {
                return redirect()->back()->withErrors(['msg' => 'GAGAL! Coba lagi']);
            }

            return redirect()->back()->withErrors(['msg' => 'Gagal: ' . $e->getMessage()]);
        }
    }

    /**
     * @param Planning $planning
     * @return RedirectResponse
     */
    public function destroy(Planning $planning): RedirectResponse
    {
        try {
            DB::transaction(function () use ($planning) {
                $planning->delete();
            });
            return redirect()->route('planning.index')->with('success', 'Planning deleted successfully!');
        } catch (\Exception $e) {
            if (str_contains($e->getMessage(), 'SQLSTATE')) {
                return redirect()->back()->withErrors(['msg' => 'GAGAL! Coba lagi']);
            }
            return redirect()->back()->withErrors(['msg' => 'Gagal: ' . $e->getMessage()]);
        }
    }
}
