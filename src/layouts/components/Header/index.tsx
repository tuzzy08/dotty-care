import * as React from 'react';
import { ActionIcon, MediaQuery, Burger, Group, Header, Text, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

interface Props {
  // children: React.ReactNode,
  opened: boolean;
  setOpened: any
}
export default function AdminLayoutHeader({ opened, setOpened }: Props) {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <Header height={{ base: 50, md: 60 }} p="md">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: boolean) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />            
        </MediaQuery>
        <Group position="apart">
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            size="xl"
            weight={700}
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
          >
            Fast Health
          </Text>
          
        </Group>
        <ActionIcon            
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}            
          </ActionIcon>
      </div>
    </Header>)
}