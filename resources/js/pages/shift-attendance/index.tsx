import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function Index({attendances}) {
    function handleEdit(id: number) {
        router.visit(route('shift.edit', id));
    }

    function handleDelete(id: number) {
        if (confirm('Yakin mau hapus?')) {
            router.delete(route('shift.destroy', id));
        }
    }
    return (
        <AppLayout>
        <Head title="Shift Attendance" />
        <div className="flex justify-between mb-4">
            <h1 className="text-xl font-semibold">Shift Attendance</h1>
            <Link href={route('shift-attendance.create')}>
                <Button>Start New Shift</Button>
            </Link>
        </div>

        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="px-4 py-2">Shift</TableHead>
                <TableHead className="px-4 py-2">Start</TableHead>
                <TableHead className="px-4 py-2">End</TableHead>
                <TableHead className="px-4 py-2">Status</TableHead>
                <TableHead className="px-4 py-2">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {attendances.map((att) => (
                <TableRow key={att.id} className="border-t">
                    <TableCell className="px-4 py-2">{att.shift?.name}</TableCell>
                    <TableCell className="px-4 py-2">{att.start_at || '-'}</TableCell>
                    <TableCell className="px-4 py-2">{att.end_at || '-'}</TableCell>
                    <TableCell className="px-4 py-2">{att.status}</TableCell>
                    <TableCell className="px-4 py-2">
                        {att.status === 'Ongoing' && (
                            <form method="post" action={route('attendance.end', att.id)}>
                                <Button type="submit" variant="destructive">End Shift</Button>
                            </form>
                        )}
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </AppLayout>
    )
}
