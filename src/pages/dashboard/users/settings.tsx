// import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Button, Group } from "@mantine/core";
// import {Logout} from '../components';

import {Layout} from '../../../layouts'

SettingsPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'user'}>{page}</Layout>
}

export default function SettingsPage() {
  return (
    // <Group mt={50} position="apart">
      <Button size="xl">Settings</Button>
      // <Logout />
    // </Group>
  );
}

// IndexPage.requireAuth = true;
// export const getServerSideProps = withPageAuthRequired()