<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use App\Models\Shift;
use App\Models\ShiftAttendance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShiftAttendanceController extends Controller
{
    // 🧾 Index - tampilkan daftar attendance
    public function index()
    {
        $user = Auth::user();

        // Jika admin, tampilkan semua
        $attendances = $user->role == 'admin'
            ? ShiftAttendance::with(['user', 'planning.shift'])->latest()->get()
            : ShiftAttendance::with(['planning.shift'])
                ->where('user_id', $user->id)
                ->latest()
                ->get();

        return Inertia::render('shift-attendance/index', [
            'attendances' => $attendances,
        ]);
    }

    public function indexStart()
    {
        $user = Auth::user();
        $plannings = Planning::where('user_id', $user->id)->whereDate('date', Carbon::today())->get();

        return Inertia::render('dashboard/employee', []);
    }

    // 🆕 Form untuk memulai shift
    public function create()
    {
        $shifts = Shift::all();

        return Inertia::render('shift-attendance/create', [
            'shifts' => $shifts,
        ]);
    }

    // ▶️ Start Shift
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shift_id' => 'required|exists:shifts,id',
        ]);

        // Pastikan user belum punya shift yang sedang berjalan
        $ongoing = ShiftAttendance::where('user_id', Auth::id())
            ->whereNull('end_at')
            ->first();

        if ($ongoing) {
            return back()->withErrors([
                'shift_id' => 'Anda masih memiliki shift yang sedang berlangsung.',
            ]);
        }

        ShiftAttendance::create([
            'user_id' => Auth::id(),
            'shift_id' => $validated['shift_id'],
            'start_at' => now(),
            'status' => 'Ongoing',
        ]);

        return redirect()->route('attendance.index')->with('success', 'Shift dimulai.');
    }

    // ⏹ End Shift
    public function end($id)
    {
        $attendance = ShiftAttendance::where('user_id', Auth::id())
            ->where('id', $id)
            ->where('status', 'Ongoing')
            ->first();

        if (!$attendance) {
            return back()->withErrors([
                'shift_id' => 'Tidak ada shift yang sedang berlangsung.',
            ]);
        }

        $attendance->update([
            'end_at' => now(),
            'status' => 'Completed',
        ]);

        return redirect()->route('attendance.index')->with('success', 'Shift telah diselesaikan.');
    }

    // 📄 Detail
    public function show($id)
    {
        $attendance = ShiftAttendance::with(['user', 'shift'])->findOrFail($id);

        return Inertia::render('ShiftAttendance/Show', [
            'attendance' => $attendance,
        ]);
    }
}
