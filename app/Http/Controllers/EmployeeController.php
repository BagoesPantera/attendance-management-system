<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;

class EmployeeController extends Controller
{
    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $search = $request->get('search', '');

        $users = User::where('role', 'employee')
            ->when($search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('employee/index', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('employee/create');
    }

    /**
     * @param StoreEmployeeRequest $request
     * @return RedirectResponse
     */
    public function store(StoreEmployeeRequest $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);
            });

            return redirect()->route('employees.index')->with('success', 'Employee created successfully!');

        } catch (\Exception $e) {
            if (str_contains($e->getMessage(), 'SQLSTATE')) {
                return redirect()->back()->withErrors(['msg' => 'GAGAL! Coba lagi']);
            }

            return redirect()->back()->withErrors(['msg' => 'Gagal: ' . $e->getMessage()]);
        }
    }

    /**
     * @param User $user
     * @return Response
     */
    public function edit(User $user): Response
    {
        return Inertia::render('employee/edit', ['employee' => $user]);
    }

    /**
     * @param UpdateEmployeeRequest $request
     * @param User $user
     * @return RedirectResponse
     */
    public function update(UpdateEmployeeRequest $request, User $user): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $user) {
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => $request->password
                        ? Hash::make($request->password)
                        : $user->password,
                ]);
            });
            return redirect()->route('employees.index')->with('success', 'Employee updated successfully!');
        } catch (\Exception $e) {
            if (str_contains($e->getMessage(), 'SQLSTATE')) {
                return redirect()->back()->withErrors(['msg' => 'GAGAL! Coba lagi']);
            }
            return redirect()->back()->withErrors(['msg' => 'Gagal: ' . $e->getMessage()]);
        }
    }

    /**
     * @param User $user
     * @return RedirectResponse
     */
    public function destroy(User $user): RedirectResponse
    {
        try {
            DB::transaction(function () use ($user) {
                $user->delete();
            });
            return redirect()->route('employees.index')->with('success', 'Employee deleted successfully!');
        } catch (\Exception $e) {
            if (str_contains($e->getMessage(), 'SQLSTATE')) {
                return redirect()->back()->withErrors(['msg' => 'GAGAL! Coba lagi']);
            }
            return redirect()->back()->withErrors(['msg' => 'Gagal: ' . $e->getMessage()]);
        }
    }
}
