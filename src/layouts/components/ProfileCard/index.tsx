import { Avatar, Text, Button, Paper } from '@mantine/core';

interface UserInfoActionProps {
  avatar: string;
  name: string;
  email: string;
  mobile: string;
}

export default function ProfileCard({ avatar, name, email, mobile}: UserInfoActionProps) {
  return (
    <Paper      
      radius="md"
      withBorder
      p="sm"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        width: '200px'
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {email} 
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {mobile}
      </Text>

      {/* <Button variant="default" fullWidth mt="md">
        Send message
      </Button> */}
    </Paper>
  );
}