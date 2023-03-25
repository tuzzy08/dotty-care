import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Menu_Item } from '../components/Navbar/links';

interface Props {
	children: React.ReactNode;
}

import { IconHome, IconBuildingHospital, IconAmbulance } from '@tabler/icons';

export const data: Array<Menu_Item> = [
	{ link: '/dashboard/admin', label: 'Home', icon: IconHome },
	{
		link: '/dashboard/admin/hospital/create',
		label: 'Create Hospital',
		icon: IconBuildingHospital,
	},
	{
		link: '/dashboard/admin/paramedic/create',
		label: 'Create Paramedic',
		icon: IconAmbulance,
	},
];

export default function AdminLayout({ children }: Props) {
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
