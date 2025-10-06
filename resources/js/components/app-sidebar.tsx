import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    BookUser,
    Route,
    CalendarClock,
    CalendarDays,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Report',
            href: route('report.index'),
            icon: CalendarDays,
        },
    ];

    if (auth.user.role === 'admin') {
        mainNavItems.push(
            {
                title: 'Employee',
                href: route('employees.index'),
                icon: BookUser,
            },
            {
                title: 'Shift',
                href: route('shift.index'),
                icon: CalendarClock ,
            },
        );
    }

    if (auth.user.role === 'employee') {
        mainNavItems.push(
            {
                title: 'Planning',
                href: route('planning.index'),
                icon: Route,
            },
        );
    }

    const footerNavItems: NavItem[] = [
        // footer items...
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
