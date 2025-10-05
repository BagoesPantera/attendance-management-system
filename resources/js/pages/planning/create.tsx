import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { CircleArrowLeft } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Planning',
        href: route('planning.create'),
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        date: '',
        planned_start: '',
        planned_end: '',

    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('employees.store'));
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

        </AppLayout>
    )
}
