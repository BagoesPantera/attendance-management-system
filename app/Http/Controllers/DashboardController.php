<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use App\Models\ShiftAttendance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        if (Auth::user()->role == 'admin'){
            $employeeCount = User::where('role', 'employee')->count();

            $todayAttendance = ShiftAttendance::whereDate('start_at', Carbon::today())
                ->distinct('user_id')
                ->count('user_id');

            $startOfWeek = Carbon::now()->copy()->startOfWeek(Carbon::MONDAY);
            $endOfWeek = Carbon::now()->copy()->endOfWeek(Carbon::SUNDAY);
            $weeklyShifts = ShiftAttendance::whereBetween('start_at', [$startOfWeek, $endOfWeek])->count();

            $recentAttendances = ShiftAttendance::with(['user', 'planning.shift'])
                ->latest()
                ->take(10)
                ->get();

            return Inertia::render('dashboard/admin', [
                'employeeCount' => $employeeCount,
                'todayAttendance' => $todayAttendance,
                'weeklyShifts' => $weeklyShifts,
                'recentAttendances' => $recentAttendances,
            ]);
        } else {
            $userId = Auth::id();
            $today = Carbon::today();

            $startOfWeek = $today->copy()->startOfWeek(Carbon::MONDAY);
            $endOfWeek = $today->copy()->endOfWeek(Carbon::SUNDAY);

            $attendances = ShiftAttendance::where('user_id', $userId)
                ->whereBetween('start_at', [$startOfWeek, $endOfWeek])
                ->where('status', 'completed')
                ->get();

            // total hours this week
            $totalMinutes = 0;
            foreach ($attendances as $a) {
                $totalMinutes += Carbon::parse($a->start_at)->diffInMinutes(Carbon::parse($a->end_at));
            }
            $totalHours = round($totalMinutes / 60, 1);

            // total atten this week
            $daysWorked = $attendances->groupBy(function ($a) {
                return Carbon::parse($a->start_at)->toDateString();
            })->count();

            // avg work time this week
            $averageHoursPerDay = $daysWorked > 0 ? round($totalHours / $daysWorked, 1) : 0;

            $plannings = Planning::with(['shift', 'attendance'])
                ->where('user_id', $userId)
                ->whereDate('date', now())
                ->get();

            return Inertia::render('dashboard/employee', [
                'stats' => [
                    'totalHours' => $totalHours,
                    'daysWorked' => $daysWorked,
                    'averageHoursPerDay' => $averageHoursPerDay,
                ],
                'plannings' => $plannings,
            ]);
        }
    }

    public function startShift(Planning $planning)
    {
        $shiftStart = Carbon::parse($planning->date)->setTimeFromTimeString($planning->shift->start_time);
        $shiftEnd = Carbon::parse($planning->date)->setTimeFromTimeString($planning->shift->end_time);
        $now = Carbon::now();

        $allowedStart = $shiftStart->copy()->subMinutes(5);

        if ($now->lt($allowedStart)) {
            return back()->with('error', 'You can only start your shift 5 minutes before the start time.');
        }

        if ($now->gt($shiftEnd)) {
            return back()->with('error', 'You cannot start your shift after it has ended.');
        }

        $attendance = ShiftAttendance::firstOrCreate(
            ['user_id' => Auth::id(), 'planning_id' => $planning->id],
            ['start_at' => Carbon::now(), 'status' => 'ongoing']
        );

        if (!$attendance->start_at) {
            $attendance->update(['start_at' => Carbon::now()]);
        }

        return back()->with('success', 'Shift started!');
    }

    public function endShift(Planning $planning)
    {
        $attendance = ShiftAttendance::where('user_id', Auth::id())
            ->where('planning_id', $planning->id)
            ->whereNull('end_at')
            ->first();

        if (!$attendance) {
            return back()->with('error', 'Shift not started yet.');
        }

        $attendance->update([
            'end_at' => now(),
            'status' => 'completed'
        ]);

        return back()->with('success', 'Shift ended!');
    }
}
