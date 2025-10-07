import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import type { BreadcrumbItem } from '@/types';

export default function Edit({ planning, shifts }) {
    const { data, setData, put, processing, errors } = useForm({
        date: planning.date ? planning.date.split('T')[0] : '',
        shift_id: planning.shift_id?.toString() || '',
        note: planning.note || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Planning',
            href: route('planning.index'),
        },
        {
            title: '/',
            href: route('planning.edit', planning.id)}
    ];

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('planning.update', planning.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Planning"/>

            <div className="m-3">
                <p className="text-3xl font-bold">Edit Planning</p>
            </div>

            <div className='w-8/12 p-4'>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className='space-y-2'>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <InputError message={errors.date} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="shift">Shift</Label>
                        <Select
                            value={data.shift_id}
                            onValueChange={(value) => setData('shift_id', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue>
                                    {data.shift_id ?
                                        shifts?.find(s => s.id.toString() === data.shift_id)?.name || 'Select Shift'
                                        : 'Select Shift'
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {shifts && shifts.length > 0 ? (
                                    shifts.map((shift) => (
                                        <SelectItem key={shift.id} value={shift.id.toString()}>
                                            {shift.name} ({shift.start_time.substring(0, 5)} - {shift.end_time.substring(0, 5)})
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="" disabled>No shifts available</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.shift_id} />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Textarea
                            placeholder="Description"
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            rows={4}
                        />
                        <InputError message={errors.note} />
                    </div>

                    <Button disabled={processing} type="submit">
                        {processing ? 'Updating...' : 'Update Planning'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}
