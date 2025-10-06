import { Head, router } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import {
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employee Dashboard',
        href: dashboard().url,
    },
];

export default function EmployeeDashboard({stats, plannings}) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-fit flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="p-6">
                            <h2 className="text-sm text-gray-500">Total Hour(s) Worked This Week</h2>
                            <p className="text-xl font-bold mt-1"><span className="text-3xl">{stats.totalHours}</span> Hour(s)</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="p-6">
                            <h2 className="text-sm text-gray-500">Number of Day(s) Present This Week</h2>
                            <p className="text-xl font-bold mt-1"><span className="text-3xl">{stats.daysWorked}</span> Day(s)</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="p-6">
                            <h2 className="text-sm text-gray-500">Average Hour(s) / Day(s) This Week</h2>
                            <p className="text-xl font-bold mt-1"><span className="text-3xl">{stats.averageHoursPerDay}</span> Hour(s)</p>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden p-6 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="w-full flex justify-center items-center">
                        <h1 className="text-xl font-bold">Shift {formattedDate}</h1>
                    </div>
                    <Table className="mt-3">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Shift</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Start At</TableHead>
                                <TableHead>End At</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {plannings.map((planning) => {
                                const attendance = planning.attendance; // relasi dari Laravel
                                return (
                                    <TableRow key={planning.id}>
                                        <TableCell>{planning.shift.name}</TableCell>
                                        <TableCell>
                                            {planning.shift.start_time.substring(0, 5)} - {planning.shift.end_time.substring(0, 5)}
                                        </TableCell>
                                        <TableCell>
                                            {attendance?.start_at
                                                ? new Date(attendance.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                : '-'}
                                        </TableCell>
                                        <TableCell>
                                            {attendance?.end_at
                                                ? new Date(attendance.end_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                : '-'}
                                        </TableCell>
                                        <TableCell>
                                            {!attendance ? (
                                                <Button onClick={() => router.post(route('dashboard.shift.start', planning.id))}>Start</Button>
                                            ) : !attendance.end_at ? (
                                                <Button onClick={() => router.post(route('dashboard.shift.end', planning.id))}>End</Button>
                                            ) : (
                                                <span className="text-gray-500">Done</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    {/*<PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />*/}
                </div>
            </div>
        </AppLayout>
    );
}
