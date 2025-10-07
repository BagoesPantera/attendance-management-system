import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Report',
        href: route('report.index'),
    },
];

export default function Reports({ report, filters, employees, isAdmin }) {
    const [startDate, setStartDate] = useState(filters.start_date || "");
    const [endDate, setEndDate] = useState(filters.end_date || "");
    const [employeeId, setEmployeeId] = useState(filters.employee_id ? String(filters.employee_id) : "all");


    const handleFilter = () => {
        const params = {
            start_date: startDate,
            end_date: endDate,
        };

        if (isAdmin && employeeId && employeeId !== 'all') {
            params.employee_id = employeeId;
        }

        router.get(route('report.index'), params);
    };

    const formatDateTime = (date) => {
        const d = new Date(date);
        return d.toLocaleString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />

            <div className="space-y-6 p-4">
                <Card className="p-4">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <div className="flex flex-col w-full md:w-auto">
                                <label className="text-sm font-medium mb-1">Start Date</label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col w-full md:w-auto">
                                <label className="text-sm font-medium mb-1">End Date</label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            {isAdmin && (
                                <div className="flex flex-col w-full md:w-1/3">
                                    <label className="text-sm font-medium mb-1">Employee</label>
                                    <Select
                                        value={employeeId}
                                        onValueChange={(val) => setEmployeeId(val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select employee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Employees</SelectItem>
                                            {employees.map((emp) => (
                                                <SelectItem key={emp.id} value={emp.id.toString()}>
                                                    {emp.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <Button onClick={handleFilter} className="flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Apply
                        </Button>
                    </div>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Shift Attendance Report</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {report.length === 0 ? (
                            <p className="text-center text-muted-foreground py-6">
                                No data found for the selected period.
                            </p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Shift</TableHead>
                                        <TableHead>Shift Time</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Late</TableHead>
                                        <TableHead>Early In</TableHead>
                                        <TableHead>Early Leave</TableHead>
                                        <TableHead>Total Hours</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {report.map((r, i) => (
                                        <TableRow key={i}>
                                            {/* Tanggal */}
                                            <TableCell>
                                                {r.date
                                                    ? new Date(r.date).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })
                                                    : '-'}
                                            </TableCell>
                                            <TableCell>{r.employee_name}</TableCell>
                                            <TableCell>{r.shift_name ?? '-'}</TableCell>
                                            <TableCell>{r.shift_time ?? '-'}</TableCell>
                                            <TableCell>
                                                {r.status === 'Absent' ? (
                                                    <span className="text-red-500 font-medium">{r.status}</span>
                                                ) : (
                                                    <span className="text-green-600 font-medium">{r.status}</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {r.is_late && r.is_late !== 'No' ? (
                                                    <span className="text-yellow-600 font-medium">{r.is_late}</span>
                                                ) : (
                                                    <span className="text-muted-foreground">No</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {r.early_in && r.early_in !== 'No' ? (
                                                    <span className="text-blue-600 font-medium">{r.early_in}</span>
                                                ) : (
                                                    <span className="text-muted-foreground">No</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {r.early_leave && r.early_leave !== 'No' ? (
                                                    <span className="text-orange-600 font-medium">{r.early_leave}</span>
                                                ) : (
                                                    <span className="text-muted-foreground">No</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {r.total_hours
                                                    ? `${Number(r.total_hours).toFixed(2)}h`
                                                    : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                <p className="text-xs text-muted-foreground text-center">
                    Last updated: {formatDateTime(new Date())}
                </p>
            </div>
        </AppLayout>
    );
}
