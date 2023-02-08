import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import Header from './Header';
import Navbar from './Navbar';

interface Props {
  children: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
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
      navbar={<Navbar opened={opened} />}
      header={<Header opened={opened} setOpened={setOpened}/>}
    >
      {children}
    </AppShell>
  );
}