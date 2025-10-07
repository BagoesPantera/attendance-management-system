<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdatePlanningRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $planning = $this->route('planning');

        return [
            'date' => 'required|date|after_or_equal:today',
            'shift_id' => [
                'required',
                'integer',
                'exists:shifts,id',
                Rule::unique('plannings')
                    ->where(function ($query) {
                        return $query->where('user_id', auth()->id())
                            ->where('date', $this->date);
                    })
                    ->ignore($this->route('planning'))
            ],
            'note' => 'nullable|string|max:500',
        ];
    }

    public function messages()
    {
        return [
            'shift_id.unique' => 'You have already made plans for this shift on the same date.',
        ];
    }
}
