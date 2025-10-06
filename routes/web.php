<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ShiftAttendanceController;
use App\Http\Controllers\ShiftController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (Auth::user()){
        return redirect()->route('dashboard');
    } else {
        return redirect()->route('login');
    }
})->name('home');

Route::middleware('auth')->controller(DashboardController::class)->prefix('dashboard')->group(function () {
    Route::get('/', 'index')->name('dashboard');

    // For Employee
    Route::post('/shift/start/{planning}', 'startShift')->name('dashboard.shift.start');
    Route::post('/shift/end/{planning}', 'endShift')->name('dashboard.shift.end');
});

Route::middleware(['auth', 'is-admin'])->prefix('employees')->controller(EmployeeController::class)->group(function () {
    Route::get('/', 'index')->name('employees.index');
    Route::get('/create','create')->name('employees.create');
    Route::post('/','store')->name('employees.store');
    Route::get('/{user}/edit','edit')->name('employees.edit');
    Route::put('/{user}','update')->name('employees.update');
    Route::delete('/{user}','destroy')->name('employees.destroy');
});

Route::middleware(['auth'])->prefix('report')->controller(ReportController::class)->group(function () {
    Route::get('/', 'index')->name('report.index');
});

Route::middleware('auth')->controller(PlanningController::class)->prefix('planning')->group(function () {
    Route::get('/', 'index')->name('planning.index');
    Route::get('/create','create')->name('planning.create');
    Route::post('/','store')->name('planning.store');
    Route::get('/{planning}/edit','edit')->name('planning.edit');
    Route::put('/{planning}','update')->name('planning.update');
    Route::delete('/{planning}','destroy')->name('planning.destroy');
});

Route::middleware(['auth', 'is-admin'])->prefix('shift')->controller(ShiftController::class)->group(function () {
    Route::get('/', 'index')->name('shift.index');
    Route::get('/create','create')->name('shift.create');
    Route::post('/','store')->name('shift.store');
    Route::get('/{shift}/edit','edit')->name('shift.edit');
    Route::put('/{shift}','update')->name('shift.update');
    Route::delete('/{shift}','destroy')->name('shift.destroy');
});

Route::middleware(['auth'])->prefix('shift-attendance')->controller(ShiftAttendanceController::class)->group(function () {
    Route::get('/', 'index')->name('shift-attendance.index');
    Route::get('/create','create')->name('shift-attendance.create');
    Route::post('/start','start')->name('shift-attendance.start');
    Route::post('/end','end')->name('shift-attendance.end');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
