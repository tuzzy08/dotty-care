import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Menu_Item } from '../components/Navbar/links';

interface Props {
  children: React.ReactNode
}

import {
  IconHome,
  IconReportMedical,
  IconSettings,
  IconUsers,
} from '@tabler/icons';

export const data: Array<Menu_Item> = [
  { link: '/dashboard/hospital', label: 'Home', icon: IconHome },
  { link: '/dashboard/hospital/patients', label: 'Patients', icon: IconUsers },
  { link: '/dashboard/ems/records', label: 'records', icon: IconReportMedical },
  { link: '/dashboard/hospital/settings', label: 'Settings', icon: IconSettings },
];


export default function HospitalLayout({ children }: Props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <AppShell
      fixed={false}
      styles={{
        main: {
          body: { minHeight: "100vh" },
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={<Navbar data={data} opened={opened} />}
      header={<Header opened={opened} setOpened={setOpened}/>}
    >
      {children}
    </AppShell>
  );
}