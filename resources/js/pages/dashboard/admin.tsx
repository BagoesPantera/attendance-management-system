import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CalendarDays,
    CheckCircle,
    Clock,
    Hourglass,
    Users,
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: dashboard().url,
    },
];

export default function AdminDashboard({ employeeCount, todayAttendance, weeklyShifts, recentAttendances }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="shadow-sm border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{employeeCount}</div>
                            <p className="text-xs text-muted-foreground">Active employees registered</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Checked In Today</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{todayAttendance}</div>
                            <p className="text-xs text-muted-foreground">Employees started shift today</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Weekly Shifts</CardTitle>
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{weeklyShifts}</div>
                            <p className="text-xs text-muted-foreground">Shifts recorded this week</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 bg-background">
                    <h2 className="text-lg font-semibold mb-3">Recent Attendance Report</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Shift</TableHead>
                                <TableHead>Start</TableHead>
                                <TableHead>End</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentAttendances.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-6">
                                        No attendance records yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                recentAttendances.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.user?.name ?? '-'}</TableCell>
                                        <TableCell>{item.planning?.shift?.name ?? '-'}</TableCell>
                                        <TableCell>
                                            {item.start_at ? new Date(item.start_at).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </TableCell>
                                        <TableCell>
                                            {item.end_at ? new Date(item.end_at).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </TableCell>
                                        <TableCell>
                                            {item.status === 'completed' ? (
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <CheckCircle className="h-4 w-4" /> Completed
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-yellow-600">
                                                    <Hourglass className="h-4 w-4" /> Ongoing
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    )
}
