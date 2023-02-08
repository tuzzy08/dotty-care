// import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Button, Group } from "@mantine/core";
// import {Logout} from '../components';

import {Layout} from '../layouts'

IndexPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'admin'}>{page}</Layout>
}

export default function IndexPage() {
  return (
    // <Group mt={50} position="apart">
      <Button size="xl">Welcome</Button>
      // <Logout />
    // </Group>
  );
}

// IndexPage.requireAuth = true;
// export const getServerSideProps = withPageAuthRequired()