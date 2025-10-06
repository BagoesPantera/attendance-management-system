<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $isAdmin = $user->role === 'admin';

        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth()->toDateString());

        $employeeId = $isAdmin
            ? $request->input('employee_id')
            : $user->id;

        $plannings = Planning::with(['user', 'shift', 'attendance'])
            ->whereBetween('date', [$startDate, $endDate])
            ->whereDate('date', '<=', now())
            ->when($employeeId, fn($q) => $q->where('user_id', $employeeId))
            ->get();

        $report = $plannings->map(function ($planning) {
            $attendance = $planning->attendance;

            $shiftStart = Carbon::parse($planning->date)->setTimeFromTimeString($planning->shift->start_time);
            $shiftEnd = Carbon::parse($planning->date)->setTimeFromTimeString($planning->shift->end_time);

            $status = 'Absent';
            $isLate = false;
            $earlyIn = false;
            $earlyLeave = false;
            $totalHours = 0;

            if ($attendance) {
                $status = 'Present';
                $start = Carbon::parse($attendance->start_at);
                $end = $attendance->end_at ? Carbon::parse($attendance->end_at) : null;

                if ($shiftEnd->lessThanOrEqualTo($shiftStart)) {
                    $shiftEnd->addDay();
                }

                if ($start->greaterThan($shiftStart)) {
                    $isLate = true;
                    $lateTime = $start->format('H:i');
                } elseif ($start->lessThan($shiftStart)) {
                    $earlyIn = true;
                    $earlyInTime = $start->format('H:i');
                }

                if ($end && $end->lessThan($shiftEnd)) {
                    $earlyLeave = true;
                    $earlyLeaveTime = $end->format('H:i');
                }

                if ($end) {
                    if ($end->lessThan($start)) {
                        $end->addDay();
                    }

                    $totalHours = round($start->diffInMinutes($end) / 60, 2);
                } else {
                    $totalHours = 0;
                }
            }

            return [
                'date' => $planning->date,
                'employee_name' => $planning->user->name,
                'shift_name' => $planning->shift->name,
                'shift_time' => $planning->shift->start_time . ' - ' . $planning->shift->end_time,
                'status' => $status,
                'is_late' => $isLate ? 'Yes (' . $lateTime . ')' : 'No',
                'early_in' => $earlyIn ? 'Yes (' . $earlyInTime . ')' : 'No',
                'early_leave' => $earlyLeave ? 'Yes (' . $earlyLeaveTime . ')' : 'No',
                'total_hours' => $totalHours,
            ];
        });

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
