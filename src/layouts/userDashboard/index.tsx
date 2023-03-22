import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Menu_Item } from '../components/Navbar/links';

interface Props {
	children: React.ReactNode;
}

import {
	IconHome2,
	IconReportMedical,
	IconSettings,
	IconBuildingHospital,
	IconNotes,
} from '@tabler/icons';

export const data: Array<Menu_Item> = [
	{ link: '/dashboard/users', label: 'Home', icon: IconHome2 },
	{
		link: '/dashboard/users/hospitals',
		label: 'Hospitals',
		icon: IconBuildingHospital,
	},
	{
		link: '/dashboard/users/records',
		label: 'My Medical Records',
		icon: IconReportMedical,
	},
	{
		link: '/dashboard/users/notes',
		label: 'Paramedic Notes',
		icon: IconNotes,
	},
	// { link: '/dashboard/users/settings', label: 'Settings', icon: IconSettings },
];

export default function UserLayout({ children }: Props) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState<boolean>(false);
	return (
		<AppShell
			// fixed={false}
			styles={{
				main: {
					body: { minHeight: '100vh' },
					background:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint='sm'
			navbar={<Navbar data={data} opened={opened} />}
			header={<Header opened={opened} setOpened={setOpened} />}
		>
			{children}
		</AppShell>
	);
}
