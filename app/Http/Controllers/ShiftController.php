<?php

namespace App\Http\Controllers;

use App\Models\Shift;
use App\Http\Requests\StoreShiftRequest;
use App\Http\Requests\UpdateShiftRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Mockery\Exception;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): Response
    {
        $shifts = Shift::all();
        return Inertia::render('shift/index', compact('shifts'));
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('shift/create');
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreShiftRequest $request
     * @return RedirectResponse
     */
    public function store(StoreShiftRequest $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
               Shift::create([
                   'name' => $request->name,
                   'start_time' => $request->start_time,
                   'end_time' => $request->end_time
               ]);
            });
            return redirect()->route('shift.index')->with('success', 'Shift created successfully!');
        } catch (\Exception $e){
            if (str_contains($e->getMessage(), 'SQLSTATE')) {
                return redirect()->back()->withErrors(['msg' => 'GAGAL! Coba lagi']);
            }

            return redirect()->back()->withErrors(['msg' => 'Gagal: ' . $e->getMessage()]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     * @param $shift
     * @return Response
     */
    public function edit($shift): Response
    {
        $shift = Shift::findOrFail($shift);
        return Inertia::render('shift/edit', compact('shift'));
    }

    /**
     * Update the specified resource in storage.
     * @param UpdateShiftRequest $request
     * @param $shift
     * @return RedirectResponse
     */
    public function update(UpdateShiftRequest $request, $shift): RedirectResponse
    {
        $shift = Shift::findOrFail($shift);
        try {
            DB::transaction(function () use ($request, $shift) {
                $shift->update([
                    'name' => $request->name,
                    'start_time' => $request->start_time,
                    'end_time' => $request->end_time
                ]);
            });
            return redirect()->route('shift.index')->with('success', 'Shift updated successfully!');
        } catch (\Exception $e) {
            if (str_contains($e->getMessage(), 'SQLSTATE')) {
                return redirect()->back()->withErrors(['msg' => 'GAGAL! Coba lagi']);
            }

            return redirect()->back()->withErrors(['msg' => 'Gagal: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param $shift
     * @return RedirectResponse
     */
    public function destroy($shift): RedirectResponse
    {
        $shift = Shift::findOrFail($shift);
        try {
            DB::transaction(function () use ($shift) {
                $shift->delete();
            });
            return redirect()->route('shift.index')->with('success', 'Shift deleted successfully!');
        } catch (\Exception $exception){
            if (str_contains($exception->getMessage(), 'SQLSTATE')) {
                return redirect()->back()->withErrors(['msg' => 'GAGAL! Coba lagi']);
            }

            return redirect()->back()->withErrors(['msg' => 'Gagal: ' . $exception->getMessage()]);
        }
    }
}
