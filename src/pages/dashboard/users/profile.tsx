// import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Button, Group } from "@mantine/core";
// import {Logout} from '../components';

import {Layout} from '../../../layouts'

ProfilePage.getLayout = function getLayout(page: any) {
  return <Layout variant={'user'}>{page}</Layout>
}

export default function ProfilePage() {
  return (
    // <Group mt={50} position="apart">
      <Button size="xl">Profile</Button>
      // <Logout />
    // </Group>
  );
}

// IndexPage.requireAuth = true;
// export const getServerSideProps = withPageAuthRequired()