<?php

namespace App\Http\Controllers;

use App\Models\ShiftAttendance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $isAdmin = $user->role === 'admin';

        // Default date filter (bulan ini)
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth()->toDateString());

        // Kalau admin bisa pilih employee, kalau bukan -> pakai ID sendiri
        $employeeId = $isAdmin
            ? $request->input('employee_id')
            : $user->id;

        // Query data dari ShiftAttendance
        $query = ShiftAttendance::query()
            ->whereBetween('start_at', [$startDate, $endDate])
            ->when($employeeId, fn($q) => $q->where('user_id', $employeeId))
            ->with('user');

        // Group dan kalkulasi
        $report = $query
            ->select(
                'user_id',
                DB::raw('COUNT(id) as total_shift'),
                DB::raw('COUNT(DISTINCT DATE(start_at)) as total_days'),
                DB::raw('SUM(TIMESTAMPDIFF(HOUR, start_at, end_at)) as total_hours')
            )
            ->groupBy('user_id')
            ->get()
            ->map(function ($item) {
                return [
                    'employee_name' => $item->user->name ?? 'Unknown',
                    'total_shift' => $item->total_shift,
                    'total_days' => $item->total_days,
                    'total_hours' => $item->total_hours,
                ];
            });

        // Hanya admin yang bisa lihat semua employee
        $employees = $isAdmin
            ? User::where('role', 'employee')->select('id', 'name')->orderBy('name')->get()
            : [];

        return Inertia::render('report/index', [
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'employee_id' => $employeeId,
            ],
            'report' => $report,
            'employees' => $employees,
            'isAdmin' => $isAdmin,
        ]);
    }
}
