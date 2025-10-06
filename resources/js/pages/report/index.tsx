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
        title: 'Reports',
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

    // Format tanggal sekarang tanpa library
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
                        <CardTitle>Report Summary</CardTitle>
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
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Total Shifts</TableHead>
                                        <TableHead>Total Days</TableHead>
                                        <TableHead>Total Hours</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {report.map((r, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{r.employee_name}</TableCell>
                                            <TableCell>{r.total_shift}</TableCell>
                                            <TableCell>{r.total_days}</TableCell>
                                            <TableCell>{r.total_hours ?? 0} hours</TableCell>
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
