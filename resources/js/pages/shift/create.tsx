import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { CircleArrowLeft } from 'lucide-react';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Shift',
        href: route('shift.create'),
    },
];

export default function Create(){
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        start_time: '',
        end_time: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('shift.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Shift" />

            <div className="m-3">
                <Link href={route('shift.index')}>
                    <Button variant="outline">
                        <CircleArrowLeft  /> Back
                    </Button>
                </Link>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='gap-1.5'>
                        <Label htmlFor="shift name">Name</Label>
                        <Input
                            placeholder="Shift 1"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name}/>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="start time">Start Time</Label>
                        <Input
                            type="time"
                            value={data.start_time}
                            onChange={(e) => setData('start_time', e.target.value)} />
                        <InputError message={errors.start_time}/>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="end time">End Time</Label>
                        <Input
                            type="time"
                            value={data.end_time}
                            onChange={(e) => setData('end_time', e.target.value)} />
                        <InputError message={errors.end_time}/>
                    </div>
                    <Button disabled={processing} type="submit">
                        {processing ? 'Creating...' : 'Create Shift'}
                    </Button>
                </form>
            </div>

        </AppLayout>
    )
}
