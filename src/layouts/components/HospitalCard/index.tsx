import { useState } from 'react';
import { Card, Image, Text, Group, Badge, createStyles, Center, Button, Switch } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconMail, IconPhone } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: 'test@test.com', icon: IconMail },
  { label: '+1 2358 5698', icon: IconPhone },
  // { label: 'Automatic gearbox', icon: IconManualGearbox },
  // { label: 'Electric', icon: IconGasStation },
];

export default function HospitalCard() {
  const { classes } = useStyles();  
  const [checked, setChecked] = useState(true);
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={18} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/09XGozT.jpeg" alt="" />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text weight={500}>Hospital Name</Text>
          {/* <Text size="xs" color="dimmed">
            Free recharge at any station
          </Text> */}
        </div>
        <Badge variant="light" color={'green'}>Access Granted</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text size="sm" color="dimmed" className={classes.label}>
         Contact Information
        </Text>

        <Group spacing={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position='apart'>
          <div>
            <Text size="lg" weight={700} sx={{ lineHeight: 1 }}>
              Change Access
            </Text>
            {/* <Text size="sm" color="dimmed" weight={500} sx={{ lineHeight: 1 }} mt={3}>
              per day
            </Text> */}
          </div>

          <Switch
            size='md'
            onLabel="Granted"
            offLabel="Denied"
            // label="Grant/Revoke"
            color="lime"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        </Group>
      </Card.Section>
    </Card>
  );
}