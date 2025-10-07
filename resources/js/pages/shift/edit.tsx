import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import type { BreadcrumbItem } from '@/types';

export default function Edit({shift}){
    const {data, setData, put, processing, errors } = useForm({
        name: shift.name,
        start_time: shift.start_time,
        end_time: shift.end_time,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Shift',
            href: route('shift.index'),
        },
        {
            title: '/',
            href: route('shift.edit', shift.id)}
    ];

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('shift.update', shift.id))
    }

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Shift"/>

            <div className="m-3">
                <p className="text-3xl font-bold">Edit Shift</p>
            </div>

            <div className='w-8/12 p-4'>
                <form onSubmit={handleUpdate} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor="shift name">Name</Label>
                        <Input
                            placeholder="Shift 1"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="start time">Start Time</Label>
                        <Input
                            type="time"
                            value={data.start_time}
                            onChange={(e) => {
                                const timeValue = e.target.value;
                                setData('start_time', timeValue + ':00');}} />
                        <InputError message={errors.start_time} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="end time">End Time</Label>
                        <Input
                            type="time"
                            value={data.end_time}
                            onChange={(e) => {
                                const timeValue = e.target.value;
                                setData('end_time', timeValue + ':00');}} />
                        <InputError message={errors.end_time} />
                    </div>
                    <Button disabled={processing} type="submit">
                        {processing ? 'Updating...' : 'Update Shift'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}
