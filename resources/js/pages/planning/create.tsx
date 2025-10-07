import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { CircleArrowLeft } from 'lucide-react';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Planning',
        href: route('planning.create'),
    },
];

export default function Create({shifts}) {
    const { data, setData, post, processing, errors } = useForm({
        date: '',
        shift_id: null,
        note: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('planning.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Planning"/>

            <div className="m-3">
                <Link href={route('planning.index')}>
                    <Button variant="outline">
                        <CircleArrowLeft  /> Back
                    </Button>
                </Link>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className='gap-1.5'>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}></Input>
                        <InputError message={errors.date} />
                    </div>

                    <div className='gap-1.5'>
                        <Label htmlFor="shift">Shift</Label>
                        <Select
                            value={data.shift_id || ''}
                            onValueChange={(value) => setData('shift_id', value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Shift" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    shifts && shifts.length > 0 && (
                                        shifts.map((shift) => (
                                        <SelectItem key={shift.id} value={shift.id.toString()}>
                                            {shift.name} ({shift.start_time.substring(0, 5)} - {shift.end_time.substring(0, 5)})
                                        </SelectItem>
                                    )))
                                }
                            </SelectContent>
                        </Select>
                        <InputError message={errors.shift_id}/>
                    </div>

                    <div className='gap-1.5'>
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Textarea
                            placeholder="Description"
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}/>
                        <InputError message={errors.note} />
                    </div>
                    <Button disabled={processing} type="submit">
                        {processing ? 'Creating...' : 'Create Planning'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}
